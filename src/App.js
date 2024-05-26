import { Space, Typography, Button } from 'antd';
import { useState } from 'react';
import FormArbi from './arbi/FormArbi';
import sound from '../src/media/soundalert.mp3';
import { get_token } from './utils/function';

const mp3 = new Audio(sound);
const { Text } = Typography;
const records_default = { timestamp: new Date(), elapsed: 0, data: [] };
function App() {
  const [ws_status, set_ws_status] = useState('Close');
  const [records, set_records] = useState(records_default);

  // const job = CronJob.from({
  //   cronTime: '*/30 * * * * *',
  //   onTick: ping,
  //   start: true,
  // });

  const openConnect = () => {
    const url = process.env.REACT_APP_URL;

    if (ws_status !== 'open') {
      const ws = new WebSocket(url);
      ws.onopen = async () => {
        console.log('Open ws to server');
        const token = await get_token();
        ws.send(token);
        set_ws_status('Open');
      };

      ws.onmessage = (event) => {
        const new_records = JSON.parse(event.data);
        //console.log(event.data);
        set_records((prev) => {
          new_records.data.forEach((item) => {
            if (
              item.notification.to_tele === 'yes' &&
              item.gain >= item.notification.level
            ) {
              mp3.play();
            }
          });
          new_records.elapsed =
            new Date(new_records.timestamp).getTime() / 1000 -
            new Date(prev.timestamp).getTime() / 1000;
          return new_records;
        });
        //set_elapsed((prev) => )
      };

      ws.onclose = () => {
        console.log('Close ws');
        set_ws_status('Close');
      };
    }
  };

  return (
    <div>
      <div>
        <Space>
          <span>Socket Status: </span>
          <Text type={ws_status === 'Open' ? 'success' : 'danger'}>
            {ws_status}
          </Text>
          <Button
            onClick={openConnect}
            type="primary"
            disabled={ws_status === 'Open' ? true : false}
          >
            Connect
          </Button>
        </Space>
      </div>
      <br></br>
      <div>
        <Space>
          <FormArbi records={records} />
        </Space>
        {/* <Space>
          <FormArbi records={records} />
        </Space> */}
      </div>
    </div>
  );
}

export default App;
