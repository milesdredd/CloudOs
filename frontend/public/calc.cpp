#include <emscripten.h>

extern "C"{
EMSCRIPTEN_KEEPALIVE
int answer(){
    return 42;
}

EMSCRIPTEN_KEEPALIVE
double calc(const char* exp){
    

}
}