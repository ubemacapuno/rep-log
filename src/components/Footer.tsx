const Footer = () => {
  return (
    <footer className="footer footer-center text-base-content">
      <div>
        <a
          rel="noreferrer noopener"
          className="no-underline link link-accent"
          href="https://liftitapp.netlify.app/"
          target="_blank"
          aria-label="GitHub Repository"
        >
          Inspired by LIFT.IT
        </a>
        <div className="py-2 flex gap-2">
          <a
            rel="noreferrer noopener"
            className="no-underline link link-secondary ml-2"
            href="https://github.com/ubemacapuno/"
            target="_blank"
            aria-label="GitHub Repository"
          >
            <svg
              className="w-5 h-5 inline-block align-text-bottom"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.912.833.091-.647.349-1.086.635-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.276.098-2.656 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 7.029c.85 0 1.7.114 2.5.334 1.909-1.294 2.747-1.025 2.747-1.025.547 1.38.202 2.403.099 2.656.64.698 1.027 1.59 1.027 2.682 0 3.841-2.337 4.687-4.564 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.479C19.138 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            rel="noreferrer noopener"
            className="no-underline link link-secondary"
            href="https://coreydamocles.netlify.app/"
            target="_blank"
          >
            Corey Damocles
          </a>
          <span className="text-primary">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
