# 获取midjourney图组

- 获取图组html标签
- 添加到index.txt文件中



## 代码部分
- 使用正则获取所有 `img src` 内容 放到数组中
- 遍历数组 创建当前时间戳文件夹例如 `./images/1681460018531`
- 将数组中的图片通过http方式下载到本地文件中