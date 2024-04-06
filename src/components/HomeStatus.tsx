import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps & { otherValue?: number; title: string }> = ({
  title,
  value,
  otherValue,
  max,
}) => {
  const pcPercentage = (value / max) * 100;
  const otherPercentage = (otherValue / max) * 100;
  const totalPercentage = pcPercentage + otherPercentage; // 累计总百分比

  // PC功耗进度条样式
  const pcProgressBarStyle: React.CSSProperties = {
    height: '100%',
    width: `${pcPercentage}%`,
    background: 'linear-gradient(90deg, #14f1e6, #1f8ef5)',
    borderRadius: '5px 0 0 5px', // 左侧圆角
    position: 'absolute',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '5px', // 文本右侧内边距
    overflow: 'hidden', // 防止文本溢出
    transition: 'width 0.5s ease-in-out', // 添加动画效果
  };

  // 其他功耗进度条样式
  const otherProgressBarStyle: React.CSSProperties = {
    height: '100%',
    width: `${totalPercentage > 100 ? 100 - pcPercentage : otherPercentage}%`,
    background: 'linear-gradient(90deg, #f5a623, #f76b1c)',
    borderRadius: '0 5px 5px 0',
    position: 'absolute',
    left: `${pcPercentage}%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '5px', // 文本左侧内边距
    overflow: 'hidden',
    transition: 'width 0.5s ease-in-out', // 添加动画效果
  };

  // 进度条容器样式
  const progressContainerStyle: React.CSSProperties = {
    height: '30px',
    maxWidth: '60%',
    backgroundColor: '#eee',
    borderRadius: '5px',
    margin: '20px auto',
    position: 'relative',
    overflow: 'hidden',
  };

  const progressTextStyle: React.CSSProperties = {
    position: 'absolute', // 绝对定位
    right: 5, // 靠右
    top: '50%', // 垂直居中
    transform: 'translateY(-50%)', // 确保文字垂直居中
    padding: '0 10px', // 避免文字紧贴进度条边缘
    color: 'white', // 文字颜色
    fontWeight: 'bold', // 字体加粗
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 可选：增加背景色以提高可读性
    borderRadius: '5px', // 可选：背景色的圆角
  };

  // 更新标题样式
  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '10px',
  };

  return (
    <div>
      <h2 className='text-colored' style={titleStyle}>{title}</h2>
      <div style={progressContainerStyle}>
        {/* PC功耗进度条 */}
        <div style={pcProgressBarStyle}>
          <span style={progressTextStyle}>{`${value} w`}</span>
        </div>
        {/* 其他功耗进度条 */}
        {otherValue && (
          <div style={otherProgressBarStyle}>
            <span style={progressTextStyle}>{`${otherValue} w`}</span>
          </div>
        )}
      </div>
    </div>
  );
};


interface SensorDisplayProps {
  title: string;
  value: number;
  unit: string;
}

// 创建一个新的组件来同时显示温度和湿度
const SensorDisplayRow: React.FC<{ temperature: number; humidity: number }> = ({
  temperature,
  humidity,
}) => {
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
    maxWidth: '30%',
    margin: '20px auto',
  };

  const sensorStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  return (
    <div style={rowStyle}>
      <div style={sensorStyle}>
        <h3 className="text-colored">🌡</h3>
        <p className="text-colored">{temperature} °C</p>
      </div>
      <div style={sensorStyle}>
        <h3 className="text-colored">humidity</h3>
        <p className="text-colored">{humidity} %</p>
      </div>
    </div>
  );
};

const HomeStatus: React.FC = () => {
  const [power, setPower] = useState<number>(0);
  // 假设的最大功耗值
  const maxPower = 450;

  const [otherPower, setOtherPower] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);

  useEffect(() => {
    // 定义获取数据的函数
    const fetchData = async () => {
      try {
        const response = await fetch('https://bubbleioa.top/home_status/');
        const data = await response.json(); // 获取 JSON 数据
        setPower(data.pc_power); // 更新 PC 功耗
        setOtherPower(data.other_power); // 更新其他功耗
        setTemperature(data.temperature); // 更新温度
        setHumidity(data['relative-humidity']); // 更新湿度
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    // 设置定时器定期获取数据
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // 每隔5秒钟获取一次数据

    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProgressBar title="power" value={power} otherValue={otherPower} max={maxPower} />
      <SensorDisplayRow temperature={temperature} humidity={humidity} />
    </div>
  );
};

export default HomeStatus;
