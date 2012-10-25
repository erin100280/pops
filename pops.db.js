var pc=require('./pops.core'), f='mongo', X=exports, dbi;
//eval(pc.$VarStr(pc,'pc'));   
Object.CopyTo(exports, require('./db/pops.db.'+f+'.js'));
