import { Col, Row, Divider, Space, Typography } from 'antd';
import { convert_timestampstring_to_string } from '../utils/function';

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
  const style = (gain) => {
    return {
      borderTop: '1px solid lightgray',
      backgroundColor: gain > 2 ? 'yellow' : gain > 0 ? 'lightblue' : '',
      textAlign: 'right',
      paddingBottom: '3px',
    };
  };
  const lastprice = (gain) => {
    return {
      color: gain > 0 ? 'red' : '',
      //backgroundColor: gain > 2 ? 'yellow' : gain > 0 ? 'lightblue' : '',
      textAlign: 'right',
      fontWeight: gain > 0 ? 'bold' : '',
    };
  };
  const other = (type, gain) => {
    switch (type) {
      case 'token':
        return { color: 'red' };
      case 'name':
        return { color: 'blue', fontWeight: 'bold' };
      case 'gain':
        return {
          color: gain > 0 ? 'red' : '',
          fontSize: '0.9rem',
          fontWeight: gain > 0 ? 'bold' : '',
        };

      default:
    }
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
              style={style(item.gain)}
              align={'middle'}
            >
              <Col flex={flex.amount_1} style={{ fontWeight: 'bold' }}>
                {item.sec_1.amountA}
              </Col>
              <Col flex={flex.token} style={other('token')}>
                {item.sec_1.tokenB}
              </Col>
              <Col flex={flex.name} style={other('name')}>
                {item.sec_1.name}
              </Col>
              <Col flex={flex.token} style={other('token')}>
                {item.sec_3.tokenA}
              </Col>
              <Col flex={flex.name} style={other('name')}>
                {item.sec_3.name}
              </Col>
              <Col flex={flex.price}>
                {round_number(item.sec_3.price, 'price')}
              </Col>

              <Col flex={flex.gain} style={other('gain', item.gain)}>
                {`${round_number(item.gain, 'gain')}u`}
              </Col>
              <Divider type="vertical" />
              <Col flex={flex.price}>
                {round_number(item.sec_3.last_price, 'price')}
              </Col>
              <Col flex={flex.gain} style={lastprice(item.gain_last_price)}>
                {round_number(item.gain_last_price, 'gain')}u
              </Col>

              <Col flex={flex.price}>
                {round_number(item.sec_1.price, 'price')}
              </Col>
              <Col
                flex={flex.amount_2}
                style={{ textAlign: 'right', fontWeight: 'bold' }}
              >
                {round_number(item.sec_1.amountB, 'qty')}
              </Col>
              <Col flex={flex.name}>{item.sec_2.name}</Col>
              <Col flex={flex.price} style={{ textAlign: 'right' }}>
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
