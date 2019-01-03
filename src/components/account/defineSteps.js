const steps = [
  {
    element: '.home_title',
    popover: {
      title: '系统logo',
      description: '这是您配置的学校名称',
      position: 'bottom',
      doneBtnText: '完成', // Text on the last button
      closeBtnText: '关闭', // Text on the close button
      nextBtnText: '下一步', // Next button text
      prevBtnText: '上一步' // Previous button text
    }
  },
  {
    element: '.switchRole',
    popover: {
      title: '角色切换',
      description: '在这里您可以切换您所具备的其他角色',
      position: 'left',
      doneBtnText: '完成', // Text on the last button
      closeBtnText: '关闭', // Text on the close button
      nextBtnText: '下一步', // Next button text
      prevBtnText: '上一步' // Previous button text
    },
    padding: 0
  },
  {
    element: '.home-aside',
    popover: {
      title: '侧边导航栏',
      description: '您在这里可以尽情地自定义您的菜单，包括栏目，顺序等',
      position: 'right',
      doneBtnText: '完成', // Text on the last button
      closeBtnText: '关闭', // Text on the close button
      nextBtnText: '下一步', // Next button text
      prevBtnText: '上一步' // Previous button text
    }
  }
  
]

export default steps
