import Raven from "raven-js";

const Log = function() {};

/**
 * 写普通日志
 * @param {String} title 
 * @param {String} context 
 * @param {String} level 
 * @param {Object} tags 
 */
Log.writeNormalLog = function(title='',context='',level='info',tags={}) {
    Raven.captureMessage(title,{level,tags,extra:{context}});
};

/**
 * 写异常日志
 * @param {String} title 
 * @param {String} context 
 * @param {String} level 
 * @param {Object} tags 
 */
Log.writeExLog = function(ex,context='',tags={}) {
    Raven.captureException(ex,{tags,extra:{context}});
};


Log.Level={
    INFO:'info',
    WARNING:'warning',
    ERROR:'error'
};

export default Log;