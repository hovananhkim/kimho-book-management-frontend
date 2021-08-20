import Layout from 'antd/lib/layout/layout';
import { Container } from 'react-bootstrap';
import Content from './components/Content';
import Header from './components/header/Header';
function App() {
  return (
    <div>
        <Layout>
            <Header />
            <Container style={{'margin-top': '15px'}}>
              <Content />  
            </Container>        
        </Layout>    
    </div>
  );
}

export default App;