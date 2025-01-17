console.log("Update-flag.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  const updateFlags = document.querySelectorAll('.updated-flag');
  console.log("Found updated flags:", updateFlags);

  const expiryDays = 7;
  const expiryTime = expiryDays * 24 * 60 * 60 * 1000;

  updateFlags.forEach(flag => {
    const updatedDate = new Date(flag.dataset.updated);
    console.log(`Article updated on: ${updatedDate}`);
    const timeDiff = Date.now() - updatedDate.getTime();
    console.log(`Time difference in days: ${timeDiff / (1000 * 60 * 60 * 24)}`);

    if (timeDiff > expiryTime) {
      console.log("Hiding flag for outdated article");
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
