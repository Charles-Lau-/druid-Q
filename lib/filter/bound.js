/**
 * Created by pengkun on 18/07/2017.
 */

class Bound {
    constructor(dimension, lower, upper, lowerStrict = false, upperStrict = true, ordering = 'lexicographic'){
        this.type = 'bound'
        this.dimension = dimension
        this.lower = lower
        this.upper = upper
        this.lowerStrict = lowerStrict
        this.upperStrict = upperStrict
        this.ordering = ordering
    }
}

Bound.ORDERING = ['lexicographic', 'alphanumeric', 'numeric', 'strlen']

module.exports = Bound
