import hector from '../images/hector.jpeg'
import emily from '../images/emily.jpg'
import steven from '../images/steven.jpeg'
import jason from '../images/jason.jpeg'
import linkedin from '../images/linkedin.png'
import github from '../images/github.png'

const Contact = (props) => {
    console.log('props in home', props)
    return (
        <div className="contact">
            <div id="contactHeader">
                <h1><b><u>Crypto/Bytes Team</u></b></h1><br></br>
                <h3>Connect with Us.  We'd love to Chat.</h3>
            </div>
            <div class="row">
                <div className="col-sm-3">
                    <img className="contactImages" src={jason} alt="Jason"></img><br></br><br></br><h5>Jason Harr</h5>
                    <div className="logoDiv">
                        <a href="https://www.linkedin.com/in/jasonharr/" target="_blank" rel="noreferrer"><img className="logo" src={linkedin}></img></a><br></br><br></br>
                        <a href="https://github.com/harrdev" target="_blank" rel="noreferrer"><img className="logo" src={github}></img></a>
                    </div>
                </div>
                <div className="col-sm-3">
                    <img className="contactImages" src={hector} alt="Hector"></img><br></br><br></br><h5>Hector Zaragoza</h5>
                    <a href="https://www.linkedin.com/in/hectorzaragoza1/" target="_blank" rel="noreferrer"><img className="logo" src={linkedin}></img></a><br></br><br></br>
                    <a href="https://github.com/hectorzaragoza" target="_blank" rel="noreferrer"><img className="logo" src={github}></img></a>
                </div>
                <div className="col-sm-3">
                    <img className="contactImages" src={emily} alt="Emily"></img><br></br><br></br><h5>Emily Barwinczak</h5>
                    <a href="https://www.linkedin.com/in/emilybarwinczak/" target="_blank" rel="noreferrer"><img className="logo" src={linkedin}></img></a><br></br><br></br>
                    <a href="https://github.com/emilybarwinczak" target="_blank" rel="noreferrer"><img className="logo" src={github}></img></a>
                </div>
                <div className="col-sm-3">
                    <img className="contactImages" src={steven} height="250px" width="250px" alt="Steven"></img><br></br><br></br><h5>Steven Lopez</h5>
                    <a href="https://www.linkedin.com/in/steven-lopez1/" target="_blank" rel="noreferrer"><img className="logo" src={linkedin}></img></a><br></br><br></br>
                    <a href="https://github.com/steven43533" target="_blank" rel="noreferrer"><img className="logo" src={github}></img></a>
                </div>
            </div>
        </div>
    )
}

export default Contact