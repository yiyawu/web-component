import React from 'react'
import Spinner from '../../component/spinner/index'
import '../../component/style/init.css'

export default function spinnerExample() {
  return (
    <div className='w-fx w-j-c' style={{ width: '100vm', height: '100vh' }}>
      <Spinner
        // 该组件的缩放系数
        size={2}
        // 子项个数
        liSize={8}
        // 子项颜色
        color='bg-blue-450'
        // 子项宽度
        liWidth={5}
        // // 子项高度
        liHeight={5}
        // 动画时长
        time={1}
        // 内圆半径
        radius={10}
      />
    </div>
  )
}
