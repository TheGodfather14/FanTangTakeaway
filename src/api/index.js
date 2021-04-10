
import ajax from './ajax'
const BASE_URL = '/api'

// 3.请求所有行政省份
export const reqAddressProvince = () => ajax('/console/index/province')
// 4.请求行政省份对应城市  有错误
export const reqAddressCity = (province) => ajax('/console/index/cityList', { province })


//1.经纬度 夺取位置
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
//2.获取轮播图
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')
//3.获取商店
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shops', { longitude, latitude })
//4.搜索
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { geohash, keyword })
//6.用户名密码登录
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
//7.请求发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })
//8.手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
//9.获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
//10.登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

//获取商家部分  无需代理
export const reqShopInfo = () => ajax('/info')
export const reqShopRatings = () => ajax('/ratings')
export const reqShopGoods = () => ajax('/goods')
