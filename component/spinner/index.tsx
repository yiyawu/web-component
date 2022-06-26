import React, { useMemo, memo } from 'react'
import './spinner.css'
import {range} from 'lodash'

interface IProps {
  // 该组件的缩放系数
  size?: number,
  // 子项个数    
  liSize?: number,
  // 子项颜色     
  color?: string,
  // 子项宽度
  liWidth?: number,
  // 子项高度      
  liHeight?: number,
  // 动画时长
  time?: number,
  // 内圆半径  
  radius?: number,
}

export default memo(
  ({
    size = 1,           // 该组件的缩放系数
    liSize = 10,        // 子项个数
    color = '#B7B9BE',  // 子项颜色
    liWidth = 5,        // 子项宽度
    liHeight = 15,      // 子项高度 
    time = 1,           // 动画时长
    radius = 10,        // 内圆半径
  }: IProps) => {

    const deg = useMemo(() => 360 / liSize, [ liSize ])
    return <div style={{ width: 50, height: 50, position: 'relative', transform: `scale(${size * 3 / 4})` }}
    >
      <div
        style={{
          width:     '100%',
          height:    '100%',
          transform: `translateY(-${liHeight / 2}px)`,
        }}
      >
        {
          range(liSize).map((_, index) => {
            return <div
              key={index}
              style={{
                position:        'absolute',
                width:           liWidth,
                height:          liHeight,
                top:             '50%',
                left:            '50%',
                transformOrigin: 'center left',
                transform:       `rotate(${deg * (index)}deg) translate(-${liWidth / 2}px, -${radius + liHeight / 2}px)`
              }}
            >
              <div
                className='bg-blue-400'
                style={{
                  width:           '100%',
                  height:          '100%',
                  borderRadius:    liWidth / 2,
                  // backgroundColor: 'bg-blue-450',
                  animation:       `w-loading ${time}s ${time / liSize * index}s infinite`,
                }}
              ></div>
            </div>
          })
        }
      </div>
    </div>
  }
)