import hector from '../images/hector.jpeg'
import emily from '../images/emily.jpg'
import steven from '../images/steven.jpeg'
import jason from '../images/jason.jpeg'

const Contact = (props) => {
    // const { msgAlert, user } = props
    console.log('props in home', props)
    // CHANGE INLINE STYLING WHEN STYLING PAGE!!!
    return (
        <div className="contact">
            <div id="contactHeader">
                <h1>Crypto/Bytes Team</h1>
                <h2>Connect with Us.  We'd love to Chat.</h2>
            </div>
            <div class="row">
                <div className="col-sm-3">
                    <img src={jason} height="250px" width="250px" alt="Jason"></img><br></br><br></br><h5>Jason Harr</h5>
                    <a href="https://www.linkedin.com/in/jasonharr/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/jasonharr/</a><br></br>
                    <a href="https://github.com/harrdev" target="_blank" rel="noreferrer">https://github.com/harrdev</a>
                </div>
                <div className="col-sm-3">
                    <img src={hector} height="250px" width="250px" alt="Hector"></img><br></br><br></br><h5>Hector Zaragoza</h5>
                    <a href="https://www.linkedin.com/in/hectorzaragoza1/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/hectorzaragoza1/</a><br></br>
                    <a href="https://github.com/hectorzaragoza" target="_blank" rel="noreferrer">https://github.com/hectorzaragoza</a>
                </div>
                <div className="col-sm-3">
                    <img src={emily} height="250px" width="250px" alt="Emily"></img><br></br><br></br><h5>Emily Barwinczak</h5>
                    <a href="https://www.linkedin.com/in/emilybarwinczak/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/emilybarwinczak/</a><br></br>
                    <a href="https://github.com/emilybarwinczak" target="_blank" rel="noreferrer">https://github.com/emilybarwinczak</a>
                </div>
                <div className="col-sm-3">
                    <img src={steven} height="250px" width="250px" alt="Steven"></img><br></br><br></br><h5>Steven Lopez</h5>
                    <a href="https://www.linkedin.com/in/steven-lopez1/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/steven-lopez1/</a><br></br>
                    <a href="https://github.com/steven43533" target="_blank" rel="noreferrer">https://github.com/steven43533</a>
                </div>
            </div>
        </div>
    )
}




export default Contact