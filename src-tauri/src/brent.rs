use argmin::core::observers::{ObserverMode, SlogLogger};
use argmin::core::{CostFunction, Error, Executor};
use argmin::solver::brent::BrentRoot;


struct TestFunc {
    a : f64,
    b : f64,
    c : f64,
}

impl CostFunction for TestFunc {
    // one dimensional problem, no vector needed
    type Param = f64;
    type Output = f64;

    fn cost(&self, p: &Self::Param) -> Result<Self::Output, Error> {
        // Ok((p + self.zero1) * (p - self.zero2) * (p - self.zero2))
        // 2次関数
        Ok((self.a * p * p) + (self.b * p) + self.c)
    }
}


pub fn brent_sample() {
    let cost = TestFunc {
        a: 1.,
        b: 2.,
        c: 3.,
    };
    let init_param = 0.5;
    let solver = BrentRoot::new(-4., 0.5, 1e-11);

    let res = Executor::new(cost, solver)
        .configure(|state| state.param(init_param).max_iters(100))
        // .add_observer(SlogLogger::term(), ObserverMode::Always)
        .run()
        .unwrap();

    // Wait a second (lets the logger flush everything before printing again)
    std::thread::sleep(std::time::Duration::from_secs(1));

    println!("Result of brent:\n{res}");
    println!("Answer: {}", res.state().best_param.unwrap());
}