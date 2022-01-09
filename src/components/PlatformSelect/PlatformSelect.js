import React from 'react';
import './PlatformSelect.css'
import { getAuthorization }  from '../../scripts/spotify'

class PlatformSelect extends React.Component {

    renderImage(s) {
        return <img src={require("./files/" + s + ".png")} className={s} alt={s +" logo"}></img>
    }

    renderInfo(s) {
        return [
                <button className="btn" onClick={() => { getAuthorization() }}>{"Log in to "  + s}</button>
            
        ]
        
    }

    render() {
        return(
            <div className="wrapper">
                <div className="container">
                    <div className="image">
                        {this.renderImage("spotify")}
                    </div>
                    {this.renderInfo("spotify")}
                </div>
                <div className="container">
                    <div className="image">
                        {this.renderImage("youtube")}
                        </div>
                    {this.renderInfo("youtube")}
                </div>
            </div>
        );
    }
}

export default PlatformSelect;