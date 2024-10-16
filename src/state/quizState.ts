import { defineStore } from 'pinia'
import _ from 'lodash'
import elementsArray from '../data/elementsArray.json'

const colors: string[] = [
  '#E6B0AA',
  '#F5B7B1',
  '#C39BD3',
  '#D2B4DE',
  '#85C1E9',
  '#76D7C4',
  '#73C6B6',
  '#82E0AA',
  '#F7DC6F',
  '#F8C471',
  '#F0B27A',
  '#D7DBDD',
  '#99A3A4',
  '#D6DBDF',
  '#ABB2B9'
]
export const elementGroupColorCodeMap: Map<string, string> = _.chain(elementsArray)
  .groupBy((e) => e.category)
  .keys()
  .sort()
  .reduce((agg, current, index, all) => {
    agg.set(current, colors[index % colors.length])
    return agg
  }, new Map<string, string>())
  .value()

export interface Element {
  period: number
  group: number
  xpos: number
  ypos: number
  number: number
  symbol: string
  name: string
  category: string
}

// key is in the format xpos-ypos eg 12-4
export type ElementsMap = Map<string, Element>

export enum QuizConfigPrimaryKey {
  periodAndGroup,
  atomicNo,
  symbol,
  name
}

export enum QuizConfigOption {
  Off,
  Show,
  AskWithHint,
  Ask
}

export type QuizConfig = {
  isSet: boolean
  primaryKey: QuizConfigPrimaryKey
  periodAndGroup: QuizConfigOption
  atomicNo: QuizConfigOption
  symbol: QuizConfigOption
  name: QuizConfigOption
  category: QuizConfigOption
}

export type QuizState = {
  elementsMap: ElementsMap
  questionsAnswered: ElementsMap
  questionsLeft: ElementsMap
  currentElement?: Element
  selectedElement?: string
  config: QuizConfig
  gaveupStatus: boolean
}

export type Answer = {
  periodAndGroup?: string
  atomicNo?: string
  symbol?: string
  name?: string
}

function keyType(primaryKey: QuizConfigPrimaryKey) {
  switch (primaryKey) {
    case QuizConfigPrimaryKey.periodAndGroup:
      return (e: Element) => `${e.xpos}-${e.ypos}`
    case QuizConfigPrimaryKey.atomicNo:
      return (e: Element) => e.number.toString()
    case QuizConfigPrimaryKey.symbol:
      return (e: Element) => e.symbol.toLowerCase()
    case QuizConfigPrimaryKey.name:
      return (e: Element) => e.name.toLowerCase()
  }
}

export const useQuizState = defineStore('quizState', {
  state: (): QuizState => {
    return {
      elementsMap: _.reduce(
        elementsArray,
        (prev: ElementsMap, current: Element, index: number, list: _.List<Element>) => {
          prev.set(`${current.xpos}-${current.ypos}`, current)
          return prev
        },
        new Map<string, Element>()
      ),
      questionsAnswered: new Map<string, Element>(),
      questionsLeft: new Map<string, Element>(),
      config: {
        isSet: false,
        primaryKey: QuizConfigPrimaryKey.name,
        periodAndGroup: QuizConfigOption.Off,
        atomicNo: QuizConfigOption.Off,
        symbol: QuizConfigOption.Off,
        name: QuizConfigOption.Off,
        category: QuizConfigOption.Off
      },
      gaveupStatus: false
    }
  },
  actions: {
    setConfig(config: QuizConfig) {
      this.config = config
      const key = keyType(this.config.primaryKey)
      this.questionsLeft = _.chain(elementsArray)
        .reduce(
          (prev: Map<string, Element>, curr: Element, index: number, list: _.List<Element>) => {
            prev.set(key(curr), curr)
            return prev
          },
          new Map<string, Element>()
        )
        .value()
    },
    setSelectedElement(key: string): void {
      this.selectedElement = key
    },
    setCurrentElement(key: string): boolean {
      key = key.toLowerCase()
      if (this.questionsLeft.has(key)) {
        this.currentElement = this.questionsLeft.get(key)
        return true
      } else {
        return false
      }
    },
    tryAnswer(answer: Answer): boolean {
      // check the answer as per config
      if (this.currentElement != undefined) {
        const key = keyType(this.config.primaryKey)(this.currentElement)
        function isOk(configOption: QuizConfigOption, expression: boolean): boolean {
          return configOption == QuizConfigOption.Ask ||
            configOption == QuizConfigOption.AskWithHint
            ? expression
            : true
        }
        const ans: Answer = {
          ...answer,
          symbol: answer.symbol?.toLowerCase(),
          name: answer.name?.toLowerCase()
        }
        if (
          isOk(
            this.config.periodAndGroup,
            ans.periodAndGroup === `${this.currentElement.xpos}-${this.currentElement.ypos}`
          ) &&
          isOk(this.config.atomicNo, ans.atomicNo === this.currentElement.number.toString()) &&
          isOk(this.config.symbol, ans.symbol === this.currentElement.symbol.toLowerCase()) &&
          isOk(this.config.name, ans.name === this.currentElement.name.toLowerCase())
        ) {
          this.questionsAnswered.set(key, this.questionsLeft.get(key)!)
          this.questionsLeft.delete(key)
          this.currentElement = undefined
          this.selectedElement = undefined
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    giveup(): void {}
  },
  getters: {
    isOver(state: QuizState): boolean {
      return state.questionsLeft.size == 0 || state.gaveupStatus
    },
    getQuestionsAnsweredCoordinateMap(state: QuizState): Map<string, Element> {
      const newKey = keyType(QuizConfigPrimaryKey.periodAndGroup)
      return new Map(
        Array.from(state.questionsAnswered).map(([key, value], index, arr) => [
          newKey(value),
          value
        ])
      )
    }
  }
})
