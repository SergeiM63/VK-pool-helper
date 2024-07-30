import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import poolCircle from './img/icons/circle.webp';
import poolOval from './img/icons/oval.webp';
import poolEight from './img/icons/eight.webp';
import poolSquare from './img/icons/square.webp';
import {
  TextField,
  InputAdornment,
  Button,
  ButtonGroup
} from '@mui/material';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  Spacing,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SegmentedControl,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import calculateVolume from './utils/calculatePoolVolume';
import data from './TEMP_DATA/products.json';
import Products from './components/Products/Products';
// import ButtonShape from './components/ButtonShape/ButtonShape';

const App = () => {
  const [activePanel, setActivePanel] = useState('calculate');

  const [poolShape, setPoolShape] = useState('');
  const [poolWidth, setPoolWidth] = useState(0);
  const [poolLength, setPoolLength] = useState(0);
  const [poolDepth, setPoolDepth] = useState(0);
  const [poolVolume, setPoolVolume] = useState(0);

  useEffect(() => {
    setPoolVolume(
      calculateVolume(poolShape, poolWidth, poolLength, poolDepth)
    );

  }, [poolShape, poolWidth, poolLength, poolDepth]);

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
            <Panel id="calculate">
              <PanelHeader className="Panel-Header">
                Расчёт бассейна
              </PanelHeader>
              <ButtonGroup className="Button-group">
                {/* <ButtonShape 
                  label = { 'Круглый' }
                  poolShape = { poolShape }
                  setPoolShape = { setPoolShape }
                /> */}

                <Button
                  className="Button"
                  variant="text"
                  onClick={() => setPoolShape('circle')}
                >
                  <label>Круглый</label>
                  <img
                    className={poolShape === 'circle' ? 'Button__img Button__img--active' : 'Button__img'}
                    src={poolCircle}
                  />
                </Button>
                
                <Button
                  className="Button"
                  variant="text"
                  onClick={() => setPoolShape('square')}
                >
                <label>Квадратный</label>
                  <img 
                    className={poolShape === 'square' ? 'Button__img Button__img--active' : 'Button__img'}
                    src={poolSquare}
                  />
                </Button>
                <Button
                  className="Button"
                  variant="text"
                  onClick={() => setPoolShape('oval')}
                >
                <label>Овальный</label>
                  <img
                    className={poolShape === 'oval' ? 'Button__img Button__img--active' : 'Button__img'}
                    src={poolOval}
                  />
                </Button>
                <Button
                  className="Button"
                  variant="text"
                  onClick={() => setPoolShape('eight')}
                >
                <label>Восьмёркой</label>
                  <img
                    className={poolShape === 'eight' ? 'Button__img Button__img--active' : 'Button__img'}
                    src={poolEight}
                  />
                </Button>
                <ButtonGroup className='TextField__container'>
                  <TextField
                    id="pool-length"
                    type='number'
                    inputProps={{min: 0}}
                    label="Длина"
                    variant="standard"
                    defaultValue={poolLength || ''}
                    onChange={(e) => setPoolLength(e.target.value)}
                  />
                  <TextField 
                    id="pool-width"
                    type='number'
                    inputProps={{min: 0}}
                    label="Ширина"
                    variant="standard"
                    defaultValue={poolWidth || ''}
                    onChange={(e) => setPoolWidth(e.target.value)}
                  />
                  <TextField
                    id="pool-depth"
                    type='number'
                    inputProps={{min: 0}}
                    label="Глубина"
                    variant="standard"
                    defaultValue={poolDepth || ''}
                    onChange={(e) => setPoolDepth(e.target.value)}
                  />
                </ButtonGroup>
                <Div>
                  <p>Объём бассейна:&nbsp;
                    {
                      poolVolume
                    } m3
                  </p>
                  
                    <TextField
                      type='number'
                      inputProps={{min: 0}}
                      label="Ввести свой объём"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">m3</InputAdornment>,
                      }}
                      defaultValue={poolVolume || ''}
                      onChange={(e) => {setPoolVolume(e.target.value);}}
                    />
                </Div>  
              </ButtonGroup>
              <Spacing size={32} />
              <Group header={<Header>Способ дезинфекции</Header>}>
                <Div>
                  <SegmentedControl
                    onChange={(e) => {
                      e === 'grid' ? 
                      console.log('Активный кислород') :
                      console.log('Хлор')
                    }}
                    options={[
                      {
                        'label': 'На основе хлора',
                        'value': 'list',
                        'aria-label': 'Хлор',
                      },
                      {
                        'label': 'Активный кислород',
                        'value': 'grid',
                        'aria-label': 'Активный кислород',
                      },
                    ]}
                  />
                </Div>
              </Group>
              <Group header={<Header>Тип бассейна</Header>}>
                <Div>
                  <SegmentedControl
                    onChange={(e) => {
                      e === 'grid' ? 
                      console.log('Бассейн Переливной') :
                      console.log('Бассейн Скиммерный')
                    }}
                    options={[
                      {
                        'label': 'Скиммерный',
                        'value': 'list',
                        'aria-label': 'Скиммерный',
                      },
                      {
                        'label': 'Переливной',
                        'value': 'grid',
                        'aria-label': 'Переливной',
                      },
                    ]}
                  />
                </Div>
              </Group>
              <Group>
                <div style={{ height: 5 }} />
                <Button
                  variant="contained"
                  onClick={() => setActivePanel('chemical')}
                  disabled={!poolVolume && true}
                >
                  Расчитать расход химии
                </Button>
                <div style={{ height: 5 }} />
              </Group>
            </Panel>

            <Panel id="chemical">
              <PanelHeader>Расчёт химии</PanelHeader>
              <Group>
                <Div className="chemical__btn-back" />
                  <Button
                    variant="contained"
                    onClick={() => setActivePanel('calculate')}
                  >
                    Назад к расчёту бассейна
                  </Button>
                <Div style={{ height: 5 }} />

                <Products
                  products={ data.products }
                  volume={ poolVolume }
                />
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

export default App;
