export const BannerEvents = () => {
  return (
    <>
      <div className="banner-events-stars" data-variant="1"></div>
      <div className="banner-events-stars" data-variant="2"></div>
      <div className="banner-events-stars" data-variant="3"></div>

      <svg
        className="banner-events-logo"
        data-variant="left"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 155 36"
      >
        <path d="M74.022.295h-8.254l-9.717 26.187-.017.034-3.369 9.086-.017.034 8.193.01 1.094-2.923.017-.009 14.258-4.422.008.026 2.731 7.327h8.193L74.022.295ZM63.313 24.232l2.473-1.793 4.1-11.059v-.009l.018.018 3.61 9.68-10.2 3.163ZM50.701.303v35.342h-7.667l.018-12.689h-16.3v12.69h-7.667V.302h7.667v14.999l16.317.026.026-15.025H50.7Zm5.514 26.179-.01.034-3.367 9.086h-.018l3.386-9.111.009-.01Zm65.86-18.403v.008-.008ZM137.314.295l-15.222.017-.06 35.385h15.247c9.787 0 17.721-7.913 17.721-17.706S147.109.295 137.314.295Zm.99 27.66c-.172.018-.335.036-.508.036-.163.008-.327.017-.5.017h-10.742l3.145-.854V8.087h7.598c5.513 0 9.993 4.422 9.993 9.939-.009 5.172-3.946 9.422-8.985 9.93Zm-17.996 7.707H109.54L96.824 22.948h-.24v12.714h-.01l-7.632.043.009-25.515h7.632v5.146h11.768a3.705 3.705 0 0 0 3.705-3.706 3.699 3.699 0 0 0-3.248-3.672H86.28L83.454.329h25.423c3.29.147 6.22 1.707 8.192 4.086.397.474.75.983 1.06 1.526a11.262 11.262 0 0 1 1.533 5.689c0 6.25-5.065 11.31-11.302 11.31h-2.912l3.213 1.034 11.647 11.688Z" />
      </svg>

      <div className="banner-events-globe">
        <canvas id="globeCanvas"></canvas>
      </div>

      <svg
        className="banner-events-logo"
        data-variant="right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 155 36"
      >
        <path d="m60.674 26.086-2.688-7.233L51.11.347h-8.253l-9.734 26.221-3.386 9.12 8.193.009 1.077-2.888.025-.009L53.3 28.378l2.73 7.327h8.193l-3.55-9.62ZM42.428 23.68l-2.102.655 2.541-1.845 4.1-11.06v-.017l.018.018 3.618 9.706-8.175 2.543ZM73.01 10.25l-.836-1.922.836 1.922ZM96.433.32v35.367h-7.727v-.008h-4.712L72.174 8.329l1.49 6.283v21.076l-7.726-.043V.32h2.782L68.71.312h8.58l.01.008 11.405 26.42V.32h7.727Zm39.835 7.689v6.344h11.2v7.844h-11.2l-2.705-.009.043.009 2.662 1.034v4.802h18.729v7.646h-26.542v-.035h-.026V.355h26.568V8.01h-18.73ZM126.645.295v7.8h-10.742c-5.513 0-9.985 4.423-9.985 9.94 0 5.18 3.937 9.43 8.977 9.93.172.017.336.026.508.034.164.009.336.009.5.009h10.742v7.68h-10.742c-9.787 0-17.72-7.913-17.72-17.705 0-9.784 7.89-17.67 17.668-17.688h10.794Zm6.961 21.903-.043-.009M15.283.303.06.32 0 35.705h15.248c9.787 0 17.72-7.913 17.72-17.705S25.079.303 15.284.303Zm.982 27.661a9.756 9.756 0 0 1-.509.035c-.163.009-.327.009-.5.009H4.515l3.145-.845V8.087h7.598c5.513 0 9.984 4.422 9.984 9.939a9.963 9.963 0 0 1-8.976 9.938Z" />
      </svg>

      <div className="banner-events-alert">
        <div className="banner-events-alert-icon">
          <svg alt="Information icon" aria-hidden="true">
            <use xlinkHref="/assets/symbols.svg#info"></use>
          </svg>
        </div>
        <p>
          {/* Download the {{ site.title }} app and stay in the loop! */}
          {/* TODO: Try to use site.title */}
          Download the Hard.Dance app and stay in the loop!
          <a href="/about.html#app">See instructions.</a>
        </p>
        <button className="button" aria-label="Close dialog" title="Close">
          <svg alt="Close" aria-hidden="true">
            <use xlinkHref="/assets/symbols.svg#close"></use>
          </svg>
        </button>
      </div>
    </>
  );
};
