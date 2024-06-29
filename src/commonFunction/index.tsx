import { ReduxData } from '../Component/Types'

export const filledStar = (item: ReduxData) => {
    const filledStar = []
    for (let i = 0; i < Math.floor(item.rating.rate); i++) {
        filledStar.push(i)
    }
    return filledStar
}

export const emptyStar = (item: ReduxData) => {
    let emptyStar = []
    for (let i = 0; i < 5 - Math.floor(item.rating.rate); i++) {
        emptyStar.push(i)
    }
    return emptyStar
}

export const searchFunc = (item: string, search: string) => {
    return item?.toLowerCase().includes(search.toLowerCase())
}
