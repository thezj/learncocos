let player = require('player')
console.log(player)
if (!window.global) {
    window.global = {
        x: 1
    }
}
cc.Class({
    extends: cc.Component,

    properties: {

        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        armerright: {
            type: cc.SpriteFrame,
            default: null,
            tooltip: '向右的精灵图片'
        },
        armerorigin: {
            type: cc.SpriteFrame,
            default: null,
            tooltip: '向左的精灵图片'

        },
        stageback: {
            type: cc.Node,
            default: null
        },
        _time: 0.0
    },

    onStart() {
        //onstart回调
        console.log('onstart回调')
        this._time = 0.0
    },

    sayhello() {
        console.log('Hello! mousedown');
    },

    // use this for initialization
    onLoad: function () {


        //创建一个动作
        //动作的回调
        let timetemp1 = 1
        var finished = cc.callFunc(function (target, param) {
            console.log('动作结束', param,timetemp1++)
        }, this, 100); //动作完成后会给玩家加100分

        let firstaction = cc.moveTo(.5, -50, 50)
        let firstsequence = cc.sequence(firstaction, cc.moveTo(.5, 0, 0))
        let firstspawn = cc.spawn(firstaction, cc.scaleTo(.5, 0.5, 0.5), cc.rotateBy(.5, 360), finished)
        let firstrepeat = cc.repeat(firstspawn, 5).easing(cc.easeIn(3.0))
        this.node.runAction(firstrepeat)
        // setTimeout(i => {
        // 停止动作
        //     this.node.stopAction(firstsequence)
        // }, 2000)
        //在node上监听事件
        this.node.on('mousedown', this.sayhello, this)

        this.node.once('mousedown', function (event) {
            console.log('Hello! mousedown im show once');
        });

        //创建节点，传入到场景中
        let soldier = new cc.Node('Sprite')
        let soldiersp = soldier.addComponent(cc.Sprite)
        soldiersp.spriteFrame = this.armerright
        soldier.height = 100
        soldier.width = 100
        soldier.x = -100
        soldier.y = 200
        soldier.parent = this.node.parent
        console.log('全局对象', global)
        global.x = 3
        setTimeout(i => {
            soldier.destroy()
            // cc.director.loadScene('helloworld')
            //关闭监听
            this.node.off('mousedown', this.sayhello, this);
        }, 2000)


        //onload回调
        console.log('onload回调')


        this.armerorigin = this.node.getComponents(cc.Sprite)[0].spriteFrame

        console.log('stage节点和当前节点zindex', this.stageback.zIndex, this.node.zIndex)
        this.stageback.zIndex = 0
        this.node.zIndex = 1
        let oddnumber = 0

        let armerright
        //通过代码动态加载资源
        cc.loader.loadRes("armerright1", cc.SpriteFrame, (err, spriteFrame) => {
            console.log('动态加载spriteframe', spriteFrame)
            var remoteUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542284937704&di=bfaddfde4bb68c20893ec105b91c7f25&imgtype=0&src=http%3A%2F%2Fhellorfimg.zcool.cn%2Fpreview%2F154672166.jpg";
            cc.loader.load(remoteUrl, function (err, texture) {
                // Use texture to create sprite frame
                console.log('远程图片', texture)
                spriteFrame.setTexture(texture)
                armerright = spriteFrame;

            });

        });





        setInterval(i => {

            //切换sprite的贴图
            if (this.node.getComponents(cc.Sprite)[0].spriteFrame == this.armerorigin) {
                //编辑器中引用
                // this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerright
                this.node.getComponents(cc.Sprite)[0].spriteFrame = armerright

            } else {
                this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerorigin
            }

            //切换节点的层级
            if (oddnumber == 0) {
                oddnumber = 1
                if (this.node.zIndex == 1) {
                    this.stageback.zIndex = 1
                    this.node.zIndex = 0
                } else {
                    this.stageback.zIndex = 0
                    this.node.zIndex = 1
                }
            } else {
                oddnumber = 0
            }

        }, 300)


        //获得节点node
        let node = this.node
        console.log(node)

        //获得其他组件
        console.log(this.getComponent(cc.Button).zoomScale = 1.5)
        //节点对象上也有个getcomponent方法和这个方法是一样的
        console.log(node.getComponent(cc.Button) === this.getComponent(cc.Button))

        //查找子节点
        console.log(this.node.children)
        //通过名称获取子节点
        console.log(this.node.getChildByName('testbutton'))
        //跨越多个层级使用路径查找子节点
        console.log(cc.find("testbutton/testlable", this.node));
    },
    btncallback: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        window.buttonevent = event
        console.log(event)
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    // called every frame
    update: function (dt) {

        this._time += dt
        if (this._time >= 3.0) {
            console.log('i am done')
            this.enabled = false
        }
    },
});