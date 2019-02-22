const Soduko = require('../core/sodoku')
const Checker = require('../core/checker')

class Grid {
  constructor (container) {
    this._$container = container
  }

  build () {
    const soduko = new Soduko()
    soduko.make()
    const matrix = soduko.puzzleMatrix
    // const generator = new Generator()
    // generator.generate()
    // const matrix = generator.matrix

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right']

    const $cells = matrix.map(rowValues => rowValues
      .map((cellValue, colIndex) => {
        return $('<span>')
          .addClass(colGroupClasses[colIndex % 3])
          .addClass(cellValue ? 'fixed' : 'empty')
          .text(cellValue)
      }))

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray)
    })

    this._$container.append($divArray)
  }

  layout () {
    const width = $('span:first', this._$container).width()
    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      })
  }

  /**
   * 检查用户解密的结果，
   * 如果成功则提示，
   * 失败则标记错误位置
   */
  check () {
    // 从页面获取需要检查的数据
    const $rows = this._$container.children()
    const data = $rows
      .map((rowIndex, div) => {
        return $(div).children()
          .map((colIndex, span) => parseInt($(span).text()) || 0)
      })
      .toArray()
      .map($data => $data.toArray())

    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }

    // 检查不成功， 进行标记
    const marks = checker.matrixMarks
    this._$container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span)
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error')
          } else {
            $span.addClass('error')
          }
        })
      })
  }

  /**
   * 重置当前谜盘到初始状态
   */
  reset () {
    this._$container.find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .addClass('empty')
      .text(0)
  }

  /**
   * 清理错误标记
   */
  clear () {
    this._$container.find('span.error')
      .removeClass('error')
  }

  /**
   * 重新开始一局新游戏
   */
  rebuild () {
    this._$container.empty()
    this.build()
    this.layout()
  }

  bindPopup (popupNumbers) {
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target)
      if ($cell.is('.fixed')) {
        return
      }
      popupNumbers.popup($cell)
    })
  }
}

module.exports = Grid
