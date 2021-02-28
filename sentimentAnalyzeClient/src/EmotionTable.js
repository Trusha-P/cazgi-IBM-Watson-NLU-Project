import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    renderTableData() {
        let emjson = this.props.emotions; //coming from App.js
        return Object.keys(emjson).map( em => {
            return <tr>
                <td>{em}</td>
                <td>{emjson[em]}</td>
            </tr>;
      })
   }

    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                this.renderTableData()
            
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
