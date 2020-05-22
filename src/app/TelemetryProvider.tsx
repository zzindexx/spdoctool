import * as React from 'react';
import {withAITracking} from '@microsoft/applicationinsights-react-js';
import {ai} from './TelemetryService';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import * as AppInsightsConfig from './../applicationInsights.config.json';

interface RouteComponentState {
    initialized: boolean;
}

interface TelemetryProviderProps {
    after: () => void;
}

type FullTelemetryProviderProps  = TelemetryProviderProps & RouteComponentProps;

class TelemetryProvider extends React.Component<FullTelemetryProviderProps, RouteComponentState> {
    constructor(props: FullTelemetryProviderProps) {
        super(props);
        this.state = {
            initialized: false
        };
    }
    

    componentDidMount() {
        const {history} = this.props;
        const {initialized} = this.state;
        const AppInsightsInstrumentationKey = AppInsightsConfig.AppInsightsInstrumentationKey;
        if (!Boolean(initialized)) {
            ai.initialize(AppInsightsInstrumentationKey, history);
            this.setState({initialized: true});
       }

        this.props.after();
    }

    render() {
        const {children} = this.props;
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider));