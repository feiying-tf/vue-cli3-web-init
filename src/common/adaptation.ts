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


// 商机详情
export class BusinessDetailAdapt {
  public id: string;
  public title: string;
  public userHeaderImg?: string;
  public contactsName?: string;
  public updTime: string;
  public contentText: string;
  public contactsMobile?: string;
  public files: Array<string>
  public itemsTemplates?: Array<any>;
  public crtUserAuthState: string;
  public crtUserName: string;

  constructor(msg: any) {
    let { id, title, crtUserName, crtUserAuthState, contactsName, contactsMobile, crtUserIcon, updTime, contentText, itemsTemplates, files} = msg;
    this.id = id;
    this.title = title;
    this.contactsName = contactsName;
    this.contactsMobile = contactsMobile;
    this.userHeaderImg = crtUserIcon;
    this.updTime = formatTime(updTime);
    this.contentText = contentText;
    this.crtUserAuthState = crtUserAuthState;
    this.crtUserName = crtUserName;
    this.files = files.map((item:any) => {
      return item.netUrl;
    });
    this.itemsTemplates = [];
    let arr:any = [];
    itemsTemplates.forEach((item:any) => {
      if (item.attrHint) {
        arr.push({
          name: item.attrName,
          value: item.attrHint
        })
      }
    });

    // 如果没有登陆，那么就提示登陆可以查看电话
    if (!getToken()) {
      arr.unshift({
        name: '联系电话',
        value: 'notLogin'
      })
    } else {
      arr.unshift({
        name: '联系电话',
        value: contactsMobile
      })
    }
    arr.unshift({
      name: '联系人',
      value: contactsName
    })
    this.itemsTemplates = arr;
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

// 我的新闻收藏
export class MyNewsCollectAdapt {
  public id: string;
  public imgUrl: string;
  public title: string;
  public crtTime: string;
  public newsAbstract: string;

  constructor(msg: any) {
    let { id, headers, newsTitle, crtTime, newsAbstract} = msg;
    this.id = id;
    this.imgUrl = headers [0] && headers[0]['netUrl'];
    this.title = newsTitle;
    this.crtTime = crtTime;
    this.newsAbstract = newsAbstract;
  }
}

// 我的商机收藏
export class MyBusinessCollectAdapt {
  public id: string;
  public imgUrl: string;
  public title: string;
  public crtTime: string;
  
  constructor(msg: any) {
    let { id, files, title, crtTime} = msg;
    this.id = id;
    this.imgUrl = files[0] && files[0]['netUrl'];
    this.title = title;
    this.crtTime = crtTime;
  }
}

// 我的新闻评论
export class MyNewsCommentAdapt {
  public id: string;
  public content: string;
  public newsTitle: string;
  public crtTime: string;

  constructor(msg: any) {
    let { id, headers, newsTitle, topList} = msg;
    this.id = id;
    this.content = topList[0] && topList[0].content;
    this.newsTitle = newsTitle;
    this.crtTime = topList[0] && topList[0].crtTime;
  }
}

// 我的商机评论
export class MyBusinessCommentAdapt {
public id: string;
public content: string;
public newsTitle: string;
public crtTime: string;

constructor(msg: any) {
  let { id, headers, title, topList} = msg;
  this.id = id;
  this.content = topList[0] && topList[0].content;
  this.newsTitle = title;
  this.crtTime = topList[0] && topList[0].crtTime;
}
}