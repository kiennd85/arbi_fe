import { Col, Row, Space, Typography } from 'antd';
import {
  convert_timestampstring_to_string,
  round_num,
} from '../utils/function';
import { LV1, LV2 } from './constants';

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
          backgroundColor: gain > LV2 ? '#FFFF99' : gain > LV1 ? 'skyblue' : '',
          //textAlign: 'right',
          //paddingBottom: '3px',
        };
      case 'amountA':
        return {
          fontWeight: 'bold',
          //textAlign: 'right',
          //borderRight: '1px solid lightgray',
        };
      // case 'amountB':
      //   return {
      //     fontWeight: 'bold',
      //     textAlign: 'right',
      //   };
      case 'token':
        return {
          color: 'red',
        };
      case 'name':
        return {
          color: name === 'Bybit' ? 'blue' : name === 'Gateio' ? 'green' : '',
          //fontWeight: 'bold',
        };
      case 'gain':
        return {
          color: gain > LV1 ? 'red' : '',
          //fontSize: '0.9rem',
          fontWeight: gain > LV1 ? 'bold' : '',
          textAlign: 'right',
          width: '100%',
        };
      case 'price':
        return {
          textAlign: 'right',
          fontSize: '0.7rem',
        };
      default:
    }
  };

  const span = {
    amountA: 2, //x1
    buy: 3, //x1
    token: 4, //x2
    //gain: 2, //x2
    price: 4, //x2
    swap: 3, //x1
  };
  return (
    <div style={{}}>
      <div style={{ width: '620px', paddingLeft: '10px' }}>
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
              gutter={[16, 0]}
              style={style({ type: 'row', gain: item.gain })}
              align={'middle'}
            >
              <Col span={span.amountA}>
                <div style={style({ type: 'amountA' })}>
                  {item.sec_1.amountA}
                </div>
              </Col>

              <Col span={span.buy}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {round_num({ number: item.sec_1.price })}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {round_num({ type: 'qty', number: item.sec_1.amountB })}
                  </div>
                </div>
              </Col>

              <Col span={span.token}>
                <div>
                  <Space>
                    <span style={style({ type: 'token' })}>
                      {item.sec_1.tokenB}
                    </span>
                    <span
                      style={style({ type: 'name', name: item.sec_1.name })}
                    >
                      {item.sec_1.name}
                    </span>
                  </Space>
                </div>
              </Col>

              <Col span={span.token}>
                <div>
                  <Space>
                    <span style={style({ type: 'token' })}>
                      {item.sec_3.tokenA}
                    </span>
                    <span
                      style={style({ type: 'name', name: item.sec_3.name })}
                    >
                      {item.sec_3.name}
                    </span>
                  </Space>
                </div>
              </Col>

              <Col span={span.price}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={style({ type: 'price' })}>
                    {round_number(item.sec_3.price, 'price')}
                  </div>
                  <div style={style({ type: 'gain', gain: item.gain })}>
                    {`${round_number(item.gain, 'gain')}u`}
                  </div>
                </div>
              </Col>
              <Col span={span.price}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={style({ type: 'price' })}>
                    {round_number(item.sec_3.last_price, 'price')}
                  </div>
                  <div style={style({ type: 'gain', gain: item.gain })}>
                    {`${round_number(item.gain_last_price, 'gain')}u`}
                  </div>
                </div>
              </Col>

              <Col span={span.swap}>
                <Space>
                  <div>{item.sec_2.name}</div>
                  <div style={style({ type: 'price' })}>
                    {round_number(item.sec_2.price, 'price')}
                  </div>
                </Space>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormArbi;
