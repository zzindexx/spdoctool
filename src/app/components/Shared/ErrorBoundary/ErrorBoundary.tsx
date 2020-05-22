import * as React from 'react';

interface IErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent<{},IErrorBoundaryState> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h3>
                                Something went wrong
                            </h3>
                            <div className="error-details">
                                Sorry, an error has occured!
                                We have logged it and will fix it ASAP.
                            </div>
                            <div className="error-actions">
                                <a href="https://github.com/zzindexx/spdoctool-collection-script" target="_blank" className="btn btn-primary">
                                    Try the latest collection script
                                </a>
                                <a href="https://github.com/zzindexx/spdoctool" target="_blank" className="btn btn-primary">
                                    Ping us on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
      }
  
      return this.props.children; 
    }
  }