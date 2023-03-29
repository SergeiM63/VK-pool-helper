import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import poolCircle from './img/icons/circle.png';
import poolOval from './img/icons/oval.png';
import poolEight from './img/icons/eight.png';
import poolSquare from './img/icons/square.png';
import { TextField, InputAdornment, Button, ButtonGroup } from '@mui/material';
import {
  CellButton,
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

const App = () => {
  const [activePanel, setActivePanel] = useState('calculate');

  const [poolShape, setPoolShape] = React.useState('');
  const [poolWidth, setPoolWidth] = React.useState(0);
  const [poolLength, setPoolLength] = React.useState(0);
  const [poolDepth, setPoolDepth] = React.useState(0);
  const [poolVolume, setPoolVolume] = useState(0);

  useEffect(() => {
    setPoolVolume( calculateVolume(poolShape, poolWidth, poolLength, poolDepth) );

  }, [poolShape, poolWidth, poolLength, poolDepth]);

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
            <Panel id="calculate">
              <PanelHeader>Расчёт бассейна</PanelHeader>
              <ButtonGroup className="Button-group">
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
                    label="Длина" 
                    variant="standard"
                    onChange={(e) => setPoolLength(e.target.value)}
                  />
                  <TextField 
                    id="pool-width"
                    type='number'
                    label="Ширина"
                    variant="standard"
                    onChange={(e) => setPoolWidth(e.target.value)}
                  />
                  <TextField
                    id="pool-depth"
                    type='number'
                    label="Глубина"
                    variant="standard"
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
                      label="Ввести свой объём"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">m3</InputAdornment>,
                      }}
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
                <CellButton onClick={() => setActivePanel('chemical')}>Расчитать расход химии</CellButton>
                <div style={{ height: 5 }} />
              </Group>
            </Panel>

            <Panel id="chemical">
              <PanelHeader>Расчёт химии</PanelHeader>
              <Group>
                <Div style={{ height: 5 }} />
                <CellButton onClick={() => setActivePanel('calculate')}>Назад к расчёту бассейна</CellButton>
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
