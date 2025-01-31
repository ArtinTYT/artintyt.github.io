document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  const updateFlags = document.querySelectorAll('.updated-flag');
  console.log("Found updated flags:", updateFlags);

  const expiryDays = 7; // 设置有效期为 7 天
  const expiryTime = expiryDays * 24 * 60 * 60 * 1000; // 转换为毫秒

  updateFlags.forEach(flag => {
    const updatedDate = new Date(flag.dataset.updated); // 从 data-updated 获取时间
    if (isNaN(updatedDate)) {
      console.warn("Invalid updated date:", flag.dataset.updated);
      return;
    }

    const timeDiff = Date.now() - updatedDate.getTime(); // 当前时间与更新时间的差
    console.log(`Article updated on: ${updatedDate}, Time difference: ${timeDiff / (1000 * 60 * 60 * 24)} days`);

    if (timeDiff > expiryTime) {
      console.log("Hiding outdated updated flag");
      flag.style.display = 'none'; // 隐藏过期标志
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const tags = document.querySelectorAll('.tagcloud a'); // 获取所有标签
  const colorSequence = ['#FFFFFF', '#BBBBBB', '#FFCCCC', '#FF9966', '#FFCC33', '#99CC33', '#3399FF', '#9966FF', '#6600CC']; // 自定义颜色梯度
  const minFrequency = Math.min(...Array.from(tags).map(tag => parseInt(tag.dataset.frequency || 1)));
  const maxFrequency = Math.max(...Array.from(tags).map(tag => parseInt(tag.dataset.frequency || 1)));

  tags.forEach(tag => {
    const frequency = parseInt(tag.dataset.frequency || 1);
    const ratio = (frequency - minFrequency) / (maxFrequency - minFrequency); // 归一化比例
    const colorIndex = Math.floor(ratio * (colorSequence.length - 1)); // 映射到颜色梯度
    tag.style.color = colorSequence[colorIndex]; // 动态设置颜色
  });
});
