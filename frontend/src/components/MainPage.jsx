import React, {Component, Fragment} from 'react';
import WeetItem from './WeetItem';

class MainPage extends Component {
    render(){
        let weets = [
            {
                title: "hello",
                content: "<h3>gsdhjgdshjdgshjdghsjgdhjfgshgfsdhgdjhfs</h3>"
            },
            {
                title: "Tweet",
                content: "<code>I am code</code"
            },
            {
                title: "Multi-format data",
                content: "<div> Typing <strong>using</strong><em>more</em> <u>than</u> <sup>one</sup> <sub>html</sub> <del>tag</del>!</div>"
            }
        ];

        return (
            <Fragment>
                <div
                    className="w3-container w3-jumbo"
                    style={{ margin: "3rem", paddingLeft: "1rem"}}>
                    Weets
                </div>
                <div className="w3-container">
                    {weets.map((item, index) =>{
                        return (
                            <WeetItem
                                title={item.title}
                                content={item.content}
                                key={index}
                            />
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}

export default MainPage;