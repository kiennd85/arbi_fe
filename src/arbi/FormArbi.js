import { Col, Row, Divider, Space, Typography, Button } from 'antd';
import { convert_timestampstring_to_string } from '../utils/function';
import { LV1, LV2 } from './constants';
import './arbi.css';

const { Text } = Typography;

const FormArbi = ({ records }) => {
  const round_number = (number, type) => {
    if (number) {
      number = parseFloat(number);
      switch (type) {
        case 'gain':
          return number.toFixed(1);
        case 'qty':
          return number.toFixed(0);
        default:
          return number > 1 ? number.toFixed(2) : number.toFixed(6);
      }
    }
  };
  const style = ({ type, gain, name }) => {
    switch (type) {
      case 'row':
        return {
          borderTop: '1px solid lightgray',
          backgroundColor:
            gain > LV2 ? 'yellow' : gain > LV1 ? 'lightblue' : '',
          //textAlign: 'right',
          paddingBottom: '3px',
        };
      case 'amountA':
        return {
          fontWeight: 'bold',
          textAlign: 'right',
        };
      case 'amountB':
        return {
          fontWeight: 'bold',
          textAlign: 'right',
        };
      case 'token':
        return {
          color: 'red',
        };
      case 'name':
        return {
          color: name === 'Bybit' ? 'blue' : name === 'Gateio' ? 'green' : '',
          fontWeight: 'bold',
        };
      case 'gain':
        return {
          color: gain > LV1 ? 'red' : '',
          fontSize: '0.9rem',
          fontWeight: gain > LV2 ? 'bold' : '',
          textAlign: 'right',
        };
      case 'price':
        return {
          textAlign: 'right',
        };
      default:
    }
  };

  const style_btn = (gain) => {
    return { display: gain > -0.5 ? '' : 'none' };
  };

  const flex = {
    timestamp: '55px',
    amount_1: '30px',
    amount_2: '65px',
    token: '55px',
    name: '50px',
    price: '65px',
    gain: '55px',
  };
  return (
    <div>
      <div style={{ width: '750px', paddingLeft: '10px' }}>
        <div>
          <Space>
            <Text> Update:</Text>
            <Text>
              {records.timestamp
                ? convert_timestampstring_to_string(records.timestamp)
                : 'No data'}
            </Text>
            <Text>{`, elapsed: ${records.elapsed.toFixed(2)}s`}</Text>
          </Space>
        </div>
        <div>
          {records.data.map((item) => (
            <Row
              key={item.code}
              gutter={[8, 16]}
              style={style({ type: 'row', gain: item.gain })}
              align={'top'}
            >
              <Col flex={flex.amount_1} style={style({ type: 'amountA' })}>
                {item.sec_1.amountA}
              </Col>
              <Col flex={flex.price} style={style({ type: 'price' })}>
                {round_number(item.sec_1.price, 'price')}
              </Col>
              <Col flex={flex.amount_2} style={style({ type: 'amountB' })}>
                {round_number(item.sec_1.amountB, 'qty')}
              </Col>
              <Col flex={flex.token} style={style({ type: 'token' })}>
                <div>
                  <div>{item.sec_1.tokenB}</div>
                  <button className="button-3" style={style_btn(item.gain)}>
                    BUY
                  </button>
                </div>
              </Col>
              <Col
                flex={flex.name}
                style={style({ type: 'name', name: item.sec_1.name })}
              >
                {item.sec_1.name}
              </Col>
              <Col flex={flex.token} style={style({ type: 'token' })}>
                <div>
                  <div>{item.sec_3.tokenA}</div>
                  <button className="button-1" style={style_btn(item.gain)}>
                    SELL
                  </button>
                </div>
              </Col>
              <Col
                flex={flex.name}
                style={style({ type: 'name', name: item.sec_3.name })}
              >
                {item.sec_3.name}
              </Col>
              <Col flex={flex.price} style={style({ type: 'price' })}>
                {round_number(item.sec_3.price, 'price')}
              </Col>

              <Col
                flex={flex.gain}
                style={style({ type: 'gain', gain: item.gain })}
              >
                {`${round_number(item.gain, 'gain')}u`}
              </Col>
              <Divider type="vertical" />
              <Col flex={flex.price}>
                {round_number(item.sec_3.last_price, 'price')}
              </Col>
              <Col
                flex={flex.gain}
                style={style({ type: 'gain', gain: item.gain_last_price })}
              >
                {round_number(item.gain_last_price, 'gain')}u
              </Col>

              <Col flex={flex.name}>
                <div>
                  <div>{item.sec_2.name}</div>
                  <button className="button-32" style={style_btn(item.gain)}>
                    SWAP
                  </button>
                </div>
              </Col>
              <Col flex={flex.price} style={style({ type: 'price' })}>
                {round_number(item.sec_2.price, 'price')}
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormArbi;
