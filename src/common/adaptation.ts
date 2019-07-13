/* 这儿通过适配器模式找出显示轮播图需要的字段 */
import { formatTime } from '@/utils/utils'
import { getToken } from '@/utils/auth';

// 轮播图
export class SliderAdapt {
  public id: string;
  public newsTitle: string;
  public netUrl: string;
  constructor(msg: any) {
    let { newsTitle, id, headers } = msg;
    this.id = id;
    this.newsTitle = newsTitle;
    this.netUrl = headers[0] && (headers[0].netUrl || '');
  }
}

// 新闻
export class NewsAdapt {
  public id: string;
  public newsTitle: string;
  public netUrl: string;
  public author: string;
  public updTime: string;
  public readCount: string;
  public newsContext: string;
  public abstract: string;
  public tags: string;
  

  constructor(msg: any) {
    let { updTime, author, newsTitle, id, headers, newsCount, newsContext, newsAbstract, tags } = msg;
    this.id = id;
    this.newsTitle = newsTitle;
    this.netUrl = headers[0] && headers[0].netUrl;
    this.author = author;
    this.updTime = formatTime(updTime);
    this.readCount = newsCount.readCount;
    this.newsContext = newsContext;
    this.abstract = newsAbstract;
    this.tags = tags;
  }
}

// 商机右侧item
export class BusinessAdapt {
  public id: string;
  public title: string;
  public img: string;
  public contactsName: string;
  public updTime: string;
  public readCount: string;
  public itemsId: string;
  public crtTime: string;
  public crtUserName: string;

  constructor(msg: any) {
    let { updTime, crtTime, itemsId, contactsName, title, id, crtUserIcon, newsCount, crtUserName } = msg;
    this.id = id;
    this.title = title;
    this.img = crtUserIcon;
    this.contactsName = contactsName;
    this.updTime = updTime;
    this.readCount = newsCount.readCount;
    this.itemsId = itemsId;
    this.crtTime = formatTime(crtTime);
    this.crtUserName = crtUserName;
  }
}

// 头条
interface HeadLines {
  newsTitle: string,
  id: string,
  headers: any,
}
export class HeadLinesAdapt {
  public id: string;
  public content: string;
  public imgPath: string;

  constructor(msg: HeadLines) {
    let { newsTitle, id, headers } = msg;
    this.id = id;
    this.content = newsTitle;
    this.imgPath = headers[0] && headers[0].netUrl || '';
  }
}


// 新闻详情
export class NewsDetailAdapt {
  public  id: string;
  public newsTitle: string;
  public author: string;
  public updTime: string;
  public readCount: number;
  public repCount: number;
  public newsContext: string;
  public tags: string;
  
  constructor(msg: any) {
    let { newsTitle, id, author, newsCount, updTime, newsContext, tags } = msg;
    this.id = id;
    this.newsTitle = newsTitle;
    this.author = author;
    this.updTime = updTime;
    this.readCount = newsCount.readCount;
    this.repCount = newsCount.repCount;
    this.newsContext = newsContext;
    this.tags = tags;
  }
}

// 用户信息
export class UserAdapt {
  public id: string;
  public name?: string;
  public username: string;
  public sex?: string;
  public description?: string;
  public headImg?: string;
  public email?: string;
  public address?: string;
  public birthday?: string;
  public userTitle?: string; //职业

  constructor(msg: any) {
    let { id, name, username, sex, address, description, attr1, email, birthday, info} = msg;
    this.id = id;
    this.name = name;
    this.username = username;
    this.sex = sex;
    this.description = description;
    this.headImg = attr1;
    this.email = email;
    this.birthday = birthday;
    this.address = address;
    this.userTitle = info.userTitle;
  }
}
