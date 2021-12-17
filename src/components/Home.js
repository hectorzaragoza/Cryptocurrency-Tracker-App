import astronaut from '../images/astronaut.png'

const Home = (props) => {

	return (
		<div className="home">
			<div id="homepage">
				<img src={astronaut} height="500px" width="500px" alt="Astronaut"></img><br></br><br></br>
				<h2>We go to the moon. Together.</h2><br></br>
				<p>Keep your Trades Ahead of the Game with Updated Pricing.</p>
				<p>Get Access to Historical Data to Inform your Financial Models. </p>
				<p>Please Trade Responsibly.</p>
				<p>We are not Financial Advisors. Just Software Engineers.</p>
			</div>
		</div>
	)
}

export default Home