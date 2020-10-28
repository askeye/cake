const express = require('express') // 使用commonjs全局引入express
const app = express()
const port = 3000 // 设置端口号
const mysql = require('mysql')
app.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ebeecake'
})
connection.connect()
// 首页数据请求
app.get('/index', (req, res) => {
    connection.query(`select id,url,title,price from goods where other='${req.query.tab}'`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
app.get('/food', (req, res) => {
    connection.query(`select * from foods`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 全部的商品
app.get('/goods', (req, res) => {
    connection.query(`select * from goods`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 点击+号显示购物车
app.get('/cover', (req, res) => {
    connection.query(`select * from goods where id=${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 详情页拿数据
app.get('/detail', (req, res) => {
    connection.query(`select * from goods where id=${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// banner拿数据
app.get('/banner', (req, res) => {
    connection.query(`select * from banner where id=${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})

// 判断用户名是否存在
app.get('/selects', (req, res) => {
    connection.query(`select * from user_info where tel=${req.query.tel}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 用户注册
app.get('/login', (req, res) => {
    connection.query(`insert into user_info (tel,password)  values ('${req.query.tel}' ,'${req.query.pwd}')`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})
// 密码登录验证
app.get('/check', (req, res) => {
    connection.query(`select * from user_info where tel=${req.query.uname} `, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})

// 修改密码
app.get('/psw_change', (req, res) => {
    connection.query(`update user_info set password = ${req.query.new} where tel=${req.query.user} `, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})

// 详情页拿详情图
app.get('/detail_img', (req, res) => {
    connection.query(`select * from detail where goods_id=${req.query.goods_id} order by id asc`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
})

// 往购物车里边存数据
app.get('/cart_list', (req, res) => {
    connection.query(`insert into cart (user_phone,goods_id,num)  values (${req.query.user} ,${req.query.id},${req.query.num})`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 根据用户手机号查询她加购了哪些商品
app.get('/get_cart', (req, res) => {
    connection.query(`
    SELECT goods.*,goods.id,cart.*
    FROM goods, cart
    WHERE  goods.id = cart.goods_id && cart.user_phone = '${req.query.user}' order by cart.id desc`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 购物车删除的时候，从数据库中删除该条记录
app.get('/del_cart', (req, res) => {
    connection.query(`DELETE FROM cart WHERE id = ${req.query.id} && user_phone = '${req.query.user}'`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})
// 步进器点减号
app.get('/change_cart', (req, res) => {
    connection.query(`update cart set num=num-1 where goods_id = ${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 步进器点+号
app.get('/add_num', (req, res) => {
    connection.query(`update cart set num=num+1 where goods_id = ${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 核对购物车里是否有该商品
app.get('/check_id', (req, res) => {
    connection.query(`select * from cart where goods_id=${req.query.goods_id} &&  user_phone=${req.query.user}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 下单
app.get('/order', (req, res) => {
    connection.query(`
    insert into orders (user_tel,receive_phone,receive_name,receive_address,good)  
    values ('${req.query.user_tel}','${req.query.receive_phone}','${req.query.receive_name}','${req.query.receive_address}','${req.query.good}');`, 
    function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
        console.log(req.query.receive_address);
    })
})

// 拿地址信息
app.get('/address', (req, res) => {
    if(req.query.id){
        connection.query(`select * from address where id=${req.query.id} &&  user_phone=${req.query.user}`, function (err, result) {
            const obj = {
                status: 200,
                data: result
            }
            res.json(obj);
        })
    }else{
        connection.query(`select * from address where user_phone=${req.query.user}`, function (err, result) {
            const obj = {
                status: 200,
                data: result
            }
            res.json(obj);
        })
    }
})

// 删地址
app.get('/del_address', (req, res) => {
    connection.query(`DELETE FROM address WHERE id = ${req.query.id} && user_phone = '${req.query.user}'`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})

// 添加一条地址信息
app.get('/add_address', (req, res) => {
    connection.query(`insert into address (province,county,addressDetail,city,tel,name,user_phone,areaCode,postalCode,isDefault,address)  values 
    ('${req.query.pro}','${req.query.county}','${req.query.addressDetail}','${req.query.city}','${req.query.tel}','${req.query.name}',
    '${req.query.user_phone}','${req.query.areaCode}','${req.query.postalCode}','${req.query.isDefault}','${req.query.address}')`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})
// 更新地址信息
app.get('/updata_address', (req, res) => {
    connection.query(`update address set province='${req.query.pro}',county='${req.query.county}',addressDetail='${req.query.addressDetail}',city='${req.query.city}',
    tel='${req.query.tel}',name='${req.query.name}',user_phone='${req.query.user_phone}',areaCode='${req.query.areaCode}',postalCode='${req.query.postalCode}',isDefault='${req.query.isDefault}',address='${req.query.address}' where id=${req.query.id}
    `, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})
// 更新默认地址
app.get('/check', (req, res) => {
    connection.query(`update address set isDefault=${req.query.isDefault} where id=${req.query.id}`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})
// 更新默认地址
app.get('/false', (req, res) => {
    connection.query(`update address set isDefault=false where user_phone='${req.query.user}'`, function (err, result) {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj);
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))