// 生成数独游戏
// 1.生成完成的解决方案: Genreator
// 2.随机去除部分数据: 按比例

const Genreator = require('./generator')

module.exports = class Soduku {
  constructor () {
    // 生成完成的解决方案
    const genreator = new Genreator()
    genreator.generate()
    this.solutionMatrix = genreator.matrix
  }

  make (level = 5) {
    // const shouldRid = Math.random() * 9 < level
    // 生成谜盘
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell)
    })
  }
}
