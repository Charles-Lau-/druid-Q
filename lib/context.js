/**
 * Created by pengkun on 20/07/2017.
 */

class Context {
    constructor(obj){
          if(obj.timeout != undefined) this.timeout = obj.timeout
          if(obj.priority != undefined) this.priority = obj.priority
          if(obj.queryId != undefined) this.queryId = obj.queryId
          if(obj.jjuseCache != undefined) this.useCache = obj.useCache
          if(obj.populateCache != undefined) this.populateCache = obj.populateCache
          if(obj.bySegment != undefined) this.bySegment = obj.bySegment
          if(obj.finalize != undefined) this.finalize = obj.finalize
          if(obj.chunkPeriod != undefined) this.chunkPeriod = obj.chunkPeriod
          //for timeseries
          if(obj.skipEmptyBuckets != undefined) this.skipEmptyBuckets = obj.skipEmptyBuckets
          // for topN query
          if(obj.minTopNThreshold != undefined) this.minTopNThreshold  = obj.minTopNThreshold
          // for groupBy
          if(obj.groupByStrategy != undefined) {
              this.groupByStrategy = obj.groupByStrategy
              if(obj.groupByStrategy == 'v1'){
                  if(obj.groupByIsSingleThreaded != undefined) this.groupByIsSingleThreaded = obj.groupByIsSingleThreaded
                  if(obj.maxIntermediateRows != undefined) this.maxIntermediateRows = obj.maxIntermediateRows
                  if(obj.maxResults != undefined) this.maxResults = obj.maxResults
                  if(obj.useOffheap != undefined) this.useOffheap = obj.useOffheap
              }
              else{
                  if(obj.bufferGrouperInitialBuckets != undefined) this.bufferGrouperInitialBuckets = obj.bufferGrouperInitialBuckets
                  if(obj.bufferGrouperMaxLoadFactor != undefined) this.bufferGrouperMaxLoadFactor = obj.bufferGrouperMaxLoadFactor
                  if(obj.maxMergingDictionarySize != undefined) this.maxMergingDictionarySize = obj.maxMergingDictionarySize
                  if(obj.maxOnDiskStorage != undefined) this.maxOnDiskStorage = obj.maxOnDiskStorage
                  if(obj.sortByDimsFirst != undefined) this.sortByDimsFirst = obj.sortByDimsFirst

              }
          }

    }
    validate() {;}
}

module.exports = Context