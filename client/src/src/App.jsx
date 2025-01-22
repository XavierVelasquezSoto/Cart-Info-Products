import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
};

export default App;
