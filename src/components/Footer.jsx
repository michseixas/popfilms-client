const Footer = () => {
  return (
    <section>
      {/* Footer */}
      <footer className="bg-dark text-white text-center text-md-start">
        {/* Grid container */}
        <div className="container p-4">
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase"></h5>
              <p>
                This web app was developed by Mich, Erika, and Toni, Web Dev students from Ironhack. We invite you to reach out to us on LinkedIn with your questions and check our portfolio on GitHub.
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">GitHub</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="https://github.com/michseixas" target="_blank" className="text-white">Mich Seixas GitHub</a>
                </li>
                <li>
                  <a href="https://github.com/erikabalog" target="_blank" className="text-white">Erika Balog GitHub</a>
                </li>
                <li>
                  <a href="https://github.com/Tonistonis" target="_blank" className="text-white">Toni Soler GitHub</a>
                </li>
              </ul>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">LinkedIn</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.linkedin.com/in/michseixas/" target="_blank" className="text-white">Mich Seixas LinkedIn</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/erika-balog-hon%C3%B3rio-da-silva-55608955/" target="_blank" className="text-white">Erika Balog LinkedIn</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/toni-soler-belando-300b38168/" target="_blank" className="text-white">Toni Soler LinkedIn</a>
                </li>
              </ul>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © Popfilms 2023 by Web Dev students @  
          <a className="text-white" href="https://ironhack.com"> Ironhack</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </section>
  );
};

export default Footer;
