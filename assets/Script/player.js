// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {

        this.enemypool = new cc.NodePool()
        let initcount = 5
        for (let i = 0; i < initcount; i++) {
            let enemyinstance = cc.instantiate(this.enemyPrefab)
            this.enemypool.put(enemyinstance)
        }

    },

    createEnemy: function (parentNode) {
        let enemy = null;
        if (this.enemypool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.enemypool.get();//从对象池获取一个敌人对象
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.enemyPrefab);
        }
        enemy.parent = this.node; // 将生成的敌人加入节点树
        enemy.getComponent('enemy').init(); 
    },

    onEnemyKilled: function (enemy) {

        console.log(this.enemypool.size(),'========================')
        // enemy 应该是一个 cc.Node
        this.enemypool.put(enemy);
        // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    // update (dt) {},
});