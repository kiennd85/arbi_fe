import { Col, Row, Radio, Divider, Space, Typography, Button } from 'antd';
import { round_num } from '../utils/function';

const { Text } = Typography;

export const BuyBtn = ({ item }) => {
  const style = (gain) => {
    return { display: gain > -1.1 ? 'flex' : 'none' };
  };
  return (
    <div style={style(item.gain)}>
      <div style={{ marginRight: '5px' }}>
        <button className="button-3">BUY</button>
      </div>
      <div>
        <Row>
          <Col>
            <Radio />
          </Col>
          <Col style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
              {round_num({ number: item.sec_1.price })}
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 'bold',
                borderBottom: '0.5px solid lightgray',
              }}
            >
              {round_num({ type: 'qty', number: item.sec_1.amountB })}
            </div>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <Radio />
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                }}
              >
                {round_num({ number: item.sec_1.price })}
              </div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                {round_num({ type: 'qty', number: item.sec_1.amountB })}
              </div>
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  );
};
