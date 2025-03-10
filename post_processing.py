import sys, os, re

def get_frontmatter(content: str):
    frontmatter = {}
    lines = [line.strip() for line in content.split('\n')]
    
    beginning_line_index, end_line_index, *_ = [i for i, line in enumerate(lines) if line.startswith('---')]
    lines = lines[beginning_line_index + 1 : end_line_index + 2]


    # Valid lines are `[a-zA-Z]+: *+` pairs
    lines = [line for line in lines if re.match(r'^[a-zA-Z]+:\s*.+$', line)]

    for line in lines:
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip()

        frontmatter[key] = value
    return frontmatter

def get_event_hash(event_name):
    event_hash = event_name

    # If begins and ends with double quotes, remove them
    if event_hash.startswith("\"") and event_hash.endswith("\""):
        event_hash = event_hash[1:-1]

    event_hash = re.sub(r'[^a-zA-Z0-9]', '-', event_hash).lower()
    return event_hash

# {date_prefix: "yyyy-MM-dd"}-{event_hash}.md
def get_event_filename(event_hash, date_prefix):
    return f'{date_prefix}-{event_hash}.md'

# (yyyy-MM-dd)-.*
def get_event_prefix(file_name):
    return file_name[:10]

# {yyyy-MM-dd}-.+\.md → .+\.jpg
def get_image_filename(file_name):
    return file_name[11:-3] + '.jpg'

posts_dir = os.path.join(os.getcwd(), '_posts')
images_dir = os.path.join(os.getcwd(), 'assets', 'img', 'events')

all_posts_files = [f for f in os.listdir(posts_dir) if f.endswith('.md')]

skip_post_filenames = [
    # '2024-01-01-template-2024.md',
    # '2024-08-25-hard-dance-nyc-presents-radical-redemption-2024-2.md',
    # '2024-04-14-hard-dance-nyc-presents-radical-redemption-2024.md'
]

# Read md file into an object
for post_old_filename in all_posts_files:
    # Only run when post_filename = ...
    # if post_old_filename != '2024-08-25-hard-dance-nyc-presents-radical-redemption-2024-2.md':
    #     continue

    if post_old_filename in skip_post_filenames:
        print(f'SKIP (skip): {post_old_filename}')
        continue

    try:
        file_content = None
        with open(os.path.join(posts_dir, post_old_filename), 'r', encoding="utf8") as f:
            file_content = f.read()

        frontmatter = get_frontmatter(file_content)

        if frontmatter.get('date').startswith('2024'):
            print(f'SKIP (date): {post_old_filename}')
            continue

        title = frontmatter.get('title')
        new_event_hash = get_event_hash(title)
        date_prefix = get_event_prefix(post_old_filename)
        post_new_filename = get_event_filename(new_event_hash, date_prefix)
        old_image_name = get_image_filename(post_old_filename)
        new_image_name = get_image_filename(post_new_filename)

        old_post_path = os.path.join(posts_dir, post_old_filename)
        new_post_path = os.path.join(posts_dir, post_new_filename)
        old_image_path = os.path.join(images_dir, old_image_name)
        new_image_path = os.path.join(images_dir, new_image_name)

        # if old paths don't exist, skip
        if not os.path.exists(old_post_path):
            print(f'SKIP (post old path not found): {post_old_filename}')
            continue
        if not os.path.exists(old_image_path):
            print(f'SKIP (image old path not found): {post_old_filename}')
            continue

        # Rename md file
        os.rename(os.path.join(posts_dir, post_old_filename), os.path.join(posts_dir, post_new_filename))

        # Rename image file
        os.rename(os.path.join(images_dir, old_image_name), os.path.join(images_dir, new_image_name))

        lines = file_content.split('\n')
        
        # Line index in lines that starts with `image:`
        image_line_index = [i for i, line in enumerate(lines) if line.startswith('image:')][0]
        # Update image in frontmatter
        lines[image_line_index] = f'image: /assets/img/events/{new_image_name}'

        # Write new frontmatter
        with open(os.path.join(posts_dir, post_new_filename), 'w', encoding="utf8") as f:
            f.write('\n'.join(lines))

        
    except Exception as e:
        print(f'FAILED: {post_old_filename}')
        print(f'New post hash: {new_event_hash}')
        print(f'Post old filename: {post_old_filename}')
        print(f'Post new filename: {post_new_filename}')
        print(f'Date prefix: {date_prefix}')
        print(f'Old image name: {old_image_name}')
        print(f'New image name: {new_image_name}')

        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        print(e)
        exit()
    