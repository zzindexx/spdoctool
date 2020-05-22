import * as React from 'react';

interface IUploadDialogProps {
    fileRef: React.RefObject<HTMLInputElement>;
    loadConfiguration: (keepData: boolean) => void;
}

interface IUploadDialogState {
    keepData: boolean;
}

export class UploadConfigDialog extends React.PureComponent<IUploadDialogProps, IUploadDialogState> {

    constructor(props) {
        super(props);
        this.state = {
            keepData: false
        }
    }

    handleFileLoad = () => {
        this.props.loadConfiguration(this.state.keepData);
    }

    handleKeepDataChange = (value: boolean) => {
        this.setState({
            keepData: value
        });
    }

    render() {
        return <div className="modal fade" id="uploadConfigurationModal" tabIndex={-1} role="dialog" aria-labelledby="uploadConfigurationModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="uploadConfigurationModalLabel">Load farm configuration</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Select a JSON file containing farm information.
                        </p>

                        <div className="form-group">
                            <input id="file-input" type="file" ref={this.props.fileRef} />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" checked={this.state.keepData} onChange={(e) => this.handleKeepDataChange(e.target.checked)} />
                            <label className="form-check-label">Keep farm data in my browser</label>
                        </div>


                        <p className="mt-3">
                            Sample script to collect information from farm can be found <a href="https://github.com/zzindexx/spdoctool-collection-script" target="_blank">here</a>.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleFileLoad()}>Load</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}