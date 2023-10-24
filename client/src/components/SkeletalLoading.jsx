export default function SkeletalLoading() {
    return (
      <div className="container">
        <div className="card" aria-hidden="true">
          <h5 className="card-header flex">
            <div className="spinner-border d-flex" role="status">
              <span className="visually-hidden text-center">Loading...</span>
            </div>
          </h5>
  
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
  
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col col-lg-2">
                  <a
                    href="#"
                    tabIndex="-1"
                    className="btn btn-primary disabled placeholder col-12"
                  ></a>
                </div>
                <div className="col col-lg-2">
                  <a
                    href="#"
                    tabIndex="-1"
                    className="btn btn-primary disabled placeholder col-12"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }