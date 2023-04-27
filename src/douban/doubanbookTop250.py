"""
@File    : 豆瓣图书Top250(手动).py
@Time    : 2019/10/30 14:27
@Author  : 封茗囧菌
@Software: PyCharm

      转载请注明原作者
	  创作不易，仅供分享

"""

#  导入相关的库
from lxml import etree
import requests
import csv  # 运用Python中的csv库,把爬取到的信息存储在本地的CSV文件中

#  新建一个csv文件

# Permission denied
# 重复使用同一个csv文件会出现[没有权限；拒绝访问]
fp = open('./doupanbooktest02.csv', 'wt', newline='', encoding='utf-8')
writer = csv.writer(fp)
# 写入表头信息
writer.writerow(('name', 'url', 'author', 'publisher', 'date', 'price', 'rate', 'comment'))

#  构造urls
urls = ['https://book.douban.com/top250?start={}'.format(i) for i in range(0, 250, 25)]

#  加入请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
}

for url in urls:
    # 用requests库获取网页信息,lxml解析html文件
    html = requests.get(url, headers=headers)
    selector = etree.HTML(html.text)

    # 取大标签,以此类推
    # <tr class='item'>
    infos = selector.xpath('//tr[@class="item"]')

    for info in infos:
        #  IndexError: list index out of range
        name = info.xpath('td/div/a/@title')[0]
        url = info.xpath('td/div/a/@href')[0]
        # /text 是获取到定位元素的文本值
        book_infos = info.xpath('td/p/text()')[0]
        # print(book_infos)
        author = book_infos.split('/')[0]
        publisher = book_infos.split('/')[-3]
        date = book_infos.split('/')[-2]
        price = book_infos.split('/')[-1]
        rate = info.xpath('td[2]/div[2]/span[2]/text()')[0]
        comments = info.xpath('td/p/span/text()')
        comment = comments[0] if len(comments) != 0 else "空"

        #  打印查看结果
        print(name, url, author, publisher, date, price, rate, comment)
        #  将上述的数据写入到csv文件
        writer.writerow((name, url, author, publisher, date, price, rate, comment))

#  关闭csv文件
fp.close()