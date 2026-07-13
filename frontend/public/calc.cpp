#include <emscripten.h>
#include <algorithm>
#include <iostream>
using namespace std;



int depth(const char* exp){
    int depth = 0;
    for(int i = 0; exp[i] != '\0' ; i++){
        switch (exp[i]){
            case '+':
                depth = max(depth,1);
                break;
            case '-' :
                depth = max(depth,1);
                break;
            case 'x' :
                depth = max(depth,2);
                break;
            case '/' :
                depth = max(depth,2);
                break;
            default:
                break;
        }
    }
    return depth;
}
double readNumber(const char* exp, int* index) {
    double num = 0;

    while (exp[*index] >= '0' && exp[*index] <= '9') {
        num = num * 10 + (exp[*index] - '0');
        ++(*index);
    }

    return num;
}
double math(const char* exp,int* depth,int* index){
        double store = 0;
        int op;
        if ( exp[*index] == '\0') return 0;
        while(exp[*index]!= '\0'){

            if ( exp[*index] >= '0' && exp[*index] <= '9'){
                 store = readNumber(exp, index);
            }
            else{
                op = (*index)++;
                if(exp[op] == '+' && (*depth) == 1 ){  store += readNumber(exp, index) ;}
                if(exp[op] == '-' && (*depth) == 1 ){  store -= readNumber(exp, index);}
                if(exp[op] == 'x' && (*depth) == 2 ){  store *= readNumber(exp, index);}
                if(exp[op] == '/' && (*depth) == 2 ) { store /= readNumber(exp, index);}
                if ( op + 1 == (*index)){
                    if(exp[op] == '+'  ) {store += math(exp,depth,index);}
                    if(exp[op] == '-'  )  {store -= math(exp,depth,index);}
                    if(exp[op] == 'x'  )  {store *= math(exp,depth,index);}
                    if(exp[op] == '/'  )  {store /= math(exp,depth,index);}
                }
            }
        }
        return store;
}
double calc(const char* exp){
    int deep = depth(exp);

    int i = 0 ;
    return math(exp,&deep,&i);
}
extern "C"
EMSCRIPTEN_KEEPALIVE
double evaluate(const char* exp) {
    cout << exp << endl;
    return calc(exp);
}