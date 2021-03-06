window.prototype.rsp6 = (function(){
    /*----- VARIABLES -----*/
    var _I = '', //User name
        _p = 0,  //Password
        _s = 0,  //Salt

        _v = 0,  //Validation sum g ^ x % N


        _N = new BigInteger('eeaf0ab9adb38dd69c33f80afa8fc5e86072618775ff3c0b9ea2314c9c256576d674df7496ea81d3383b4813d692c6e0e0d5d8e250b98be48e495c1d6089dad15dc7d7b46154d6b6ce8ef4ad69b15d4982559b297bcf1885c529f566660e57ec68edbc3c05726cc02fd4cbf4976eaa9afd5138fe8376435b9fc61d2fc0eb06e3', 16),     //Safe prime

        _a = 0,  //Random number

        _k = 0,  //Multiplying constant H( N, g )
        _g = 2,  //Modulus generator
        _x = 0,  //Hash-salted password H( s, p )

        _u = 0,  //Handshake fingerprint H( A, B )


        _A = 0,  //Mixed parties keys(Diffie-Helman) g % N
        _B = 0,  //Mixed parties keys(Diffie-Helman) k * v + g ^ b % N

        _S = 0,  //Session Id((B - k * ( g ^ x % N )) ^ ( a + u * x )) % N
        _K = 0,  //Client session key H(S)

        _Mc = 0, //Client confirmation message H( H(N) XOR H(g), H(I), S, A, B, K )

        _Rc = 0, //Client response H(A, Mc, Kc)
        _Rs = 0, //Server response H(A, Ms, Ks)

    /*----- VARIABLES END -----*/

    /*----- METHODS -----*/
        calc = {

            //Hash function
            H: function(){
                if(arguments.length !== 0){

                    var concat = '';
                    for(var i = 0; i < arguments.length; i++){
                        concat = concat + arguments[i].toString(16);
                    }
                    
                    return CryptoJS.SHA512(concat);

                }
                return undefined;
            },

            PRNG: function(size){

                var _n = size !== undefined ? Math.round(size / 32 * 8) : 4

                var random;
                if (window.crypto && window.crypto.getRandomValues) {
                    //Use browser build in crypto PRNG.
                    random = new Int32Array(n);
                    window.crypto.getRandomValues(random);
                }else if (window.msCrypto && window.msCrypto.getRandomValues) {
                    //Cause IE can not simply be same as others.
                    random = new Int32Array(n);
                    window.msCrypto.getRandomValues(random);
                }else {

                }
            },
        
            v: function(){
                //Validation sum g ^ x % N
                return Math.pow(_g, _x) % _N;
            },
            
            k: function(){
                return this.H(_N.toString(16), _g.toString(16));
            },

            A: function(){ 
                //Mixed parties keys(Diffie-Helman) g % N
                return _g % _N;
            },
            
            B: function(){ 
                //Mixed parties keys(Diffie-Helman) k * v + g ^ b % N
                return _k * _v + Math.pow(_g, _b) % _N;
            },

            u: function(){
                return this.H(A, B);
            },

            x: function(){
                return this.H(s, p);
            },

            S: function(){
                //Session sum
                return ( Math.pow( ( _B - _k * ( Math.pow(_g, _x) % _N )), _a + _u * _x ) ) % _N;
            },
            
            K: function(){
                //Session key
                return this.H(_S)
            },

            m: function(){
                return this.H( parseInt(this.H(_N), 16) ^ parseInt(this.H(_g), 16), this.H(_I), _S, _A, _B, _K);
            },

            R: function(){
                return H(_A, _Mc, _K);
            }

        }
    /*----- METHODS END -----*/

    return {
        authorize: function(username, password, callback){

        }
    }

}())