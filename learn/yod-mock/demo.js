/**
 * Created by jade on 2015/6/9.
 */
/*
 * 这是一个基于node生成测试数据
 *
 * */

var yod = require("yod-mock");

yod.type('User', {
    id:"@Id",
    name: {
        first: '@First',
        last: '@Last'
    },
    fullName: '@Self.name.first @First @Self.name.last', // refer 'name' property
    chineseName: '@ChineseName',
    age: '@Age(adult)', // call a type with argument
    to100: '` 100 - @Self.age `', // execute javascript
    children: '@First.repeat(1, 3)', // get an array
    childrenCount: '@Self.children.length', // call js native property "length"
    favouriteChild: '@Self.children.sample', // call lodash function "sample"
    avatar: '@Avatar',
    others: {
        getSystemConfig: '@Config.system.video.hotbody.sample',
        useParent: 'My name is @Parent.name.first.',
        protection: 'Get firstName.length: ${@Parent.name.first}.length',
        escape: 'You can escape caller \\@Parent.name.first.'
    }
});

console.log(yod({
    list:"@User.repeat(2,4)"
}))


