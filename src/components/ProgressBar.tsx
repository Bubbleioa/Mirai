import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  const progressContainerStyle: React.CSSProperties = {
    height: '30px',
    maxWidth: '60%',
    backgroundColor: '#eee',
    borderRadius: '5px',
    margin: '20px auto', // 上下保持20px，左右自动，以居中
    position: 'relative', // 为了绝对定位数字
    overflow: 'hidden', // 确保渐变不超过边界
  };

  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    width: `${percentage}%`,
    background: 'linear-gradient(90deg, #14f1e6, #1f8ef5)',
    borderRadius: '5px',
    transition: 'width 0.4s ease-in-out',
    display: 'flex', // 用于水平居中数字
    alignItems: 'center', // 用于垂直居中数字
    justifyContent: 'center', // 同上
    color: 'white', // 数字颜色
    fontWeight: 'bold', // 字体加粗
    position: 'relative', // 设置为 relative 以便于定位内部的 span
  };

  const progressTextStyle: React.CSSProperties = {
    position: 'absolute', // 绝对定位
    right: 0, // 靠右
    top: '50%', // 垂直居中
    transform: 'translateY(-50%)', // 确保文字垂直居中
    padding: '0 10px', // 避免文字紧贴进度条边缘
    color: 'white', // 文字颜色
    fontWeight: 'bold', // 字体加粗
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 可选：增加背景色以提高可读性
    borderRadius: '5px', // 可选：背景色的圆角
  };

  return (
    <div style={progressContainerStyle}>
      <div style={progressBarStyle}>
        {/* 这里可以选择是否在进度条内显示文字 */}
        <span style={progressTextStyle}>{`${value} w`}</span>
      </div>
    </div>
  );
};

const PowerConsumption: React.FC = () => {
  const [power, setPower] = useState<number>(0);
  const maxPower = 1000; // 假设的最大功耗值

  useEffect(() => {
    // 定义获取数据的函数
    const fetchData = async () => {
      try {
        const response = await fetch('https://bubbleioa.top/power_consumption/');
        const textData = await response.text(); // 获取纯文本响应
        const numericValue = parseInt(textData, 10); // 将纯文本转换为数字
        if (!isNaN(numericValue)) {
          setPower(numericValue); // 更新状态
        }
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

  return <ProgressBar value={power} max={maxPower} />;
};

export default PowerConsumption;
