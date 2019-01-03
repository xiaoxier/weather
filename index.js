const minimist = require('minimist')
const ajax = require('./ajax.js')
const loading = require('./loading')
const edition = require('./package.json').version
module.exports = async ()=>{
    const args = minimist(process.argv.slice(2));//前两个是编译器相关路径信息，可以忽略
    let cmd = args._[0] || 'help';
    if(args.v || args.version){
		cmd = 'version';//查询版本优先！
	}
    let location = args.location || '北京';
    loading.start();
    let data = await ajax(location);
    data = data.results[0];
	let posotion= data.location;
    let daily = data.daily;
    switch(cmd){
        case 'today':
    	//console.log('今天天气不错呢，暖心悦目！');
    	console.log(`${posotion.timezone_offset}时区,${posotion.name}天气，${posotion.country}`)
        console.log(`今天${daily[0].date}:白天${daily[0].text_day}夜晚${daily[0].text_night}`)
        loading.stop();
        break;
        case 'tomorrow':
        
    	//console.log('明天下大雨，注意带雨伞！');
    	console.log(`${posotion.timezone_offset}时区,${posotion.name}天气，${posotion.country}`)
        console.log(`今天${daily[1].date}:白天${daily[1].text_day}夜晚${daily[1].text_night}`)
        loading.stop();
    	break;
        case 'version':
        
        console.log(edition)
        loading.stop();
    	break;
    	case 'help':
    	console.log(`
     	weather [command] <options>
  
		      today .............. show weather for today
		      tomorrow ............show weather for tomorrow
		      version ............ show package version
		      help ............... show help menu for a command
        `)
        loading.stop();
        default:
        console.log(`你输入的命令无效：${cmd}`)
        loading.stop();
    }
}
