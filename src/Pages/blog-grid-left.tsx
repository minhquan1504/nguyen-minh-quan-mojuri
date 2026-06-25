export default function BlogGridLeft(){
    return(
        <>
            <div id="site-main" className="site-main">
  <div id="main-content" className="main-content">
    <div id="primary" className="content-area">
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading">Wedding &amp; Bridal</h1>
          </div>
          <div className="breadcrumbs">
            <a href="index.html">Home</a>
            <span className="delimiter" />
            Wedding &amp; Bridal
          </div>
        </div>
      </div>
      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container p-l-r">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">
                {/* Block Post Search */}
                <div className="block block-post-search">
                  <div className="block-title">
                    <h2>Search</h2>
                  </div>
                  <div className="block-content">
                    <form method="get" className="search-from" action="">
                      <input
                        type="text"
                        defaultValue=""
                        name="s"
                        className="s"
                        placeholder="Search..."
                      />
                      <button className="btn" type="submit">
                        <i className="icon-search" />
                      </button>
                    </form>
                  </div>
                </div>
                {/* Block Post Categories */}
                <div className="block block-post-cats">
                  <div className="block-title">
                    <h2>Categories</h2>
                  </div>
                  <div className="block-content">
                    <div className="post-cats-list">
                      <ul>
                        <li>
                          <a href="blog-grid-left.html">
                            Bracelets <span className="count">9</span>
                          </a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">
                            Earrings <span className="count">4</span>
                          </a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">
                            Necklaces <span className="count">3</span>
                          </a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">
                            News <span className="count">6</span>
                          </a>
                        </li>
                        <li className="current">
                          <a href="blog-grid-left.html">
                            Wedding &amp; Bridal{" "}
                            <span className="count">2</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Block Posts */}
                <div className="block block-posts">
                  <div className="block-title">
                    <h2>Recent Posts</h2>
                  </div>
                  <div className="block-content">
                    <ul className="posts-list">
                      <li className="post-item">
                        <a
                          href="blog-details-right.html"
                          className="post-image"
                        >
                          <img src="/media/blog/1.jpg" />
                        </a>
                        <div className="post-content">
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Bridial Fair Collections 2023
                            </a>
                          </h2>
                          <div className="post-time">
                            <span className="post-date">May 30, 2023</span>
                          </div>
                        </div>
                      </li>
                      <li className="post-item">
                        <a
                          href="blog-details-right.html"
                          className="post-image"
                        >
                          <img src="/media/blog/2.jpg" />
                        </a>
                        <div className="post-content">
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Our Sterling Silver
                            </a>
                          </h2>
                          <div className="post-time">
                            <span className="post-date">Aug 24, 2023</span>
                          </div>
                        </div>
                      </li>
                      <li className="post-item">
                        <a
                          href="blog-details-right.html"
                          className="post-image"
                        >
                          <img src="/media/blog/3.jpg" />
                        </a>
                        <div className="post-content">
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              New Season Modern Gold Earrings
                            </a>
                          </h2>
                          <div className="post-time">
                            <span className="post-date">Dec 06, 2023</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Block Post Archives */}
                <div className="block block-post-archives">
                  <div className="block-title">
                    <h2>Archives</h2>
                  </div>
                  <div className="block-content">
                    <div className="post-archives-list">
                      <ul>
                        <li>
                          <a href="blog-grid-left.html">May 2023</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">April 2023</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">August 2022</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Block Post Tags */}
                <div className="block block-post-tags">
                  <div className="block-title">
                    <h2>Tags</h2>
                  </div>
                  <div className="block-content">
                    <div className="post-tags-list">
                      <ul>
                        <li>
                          <a href="blog-grid-left.html">Jewelry</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Ring Styles</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Gift Ideas</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Wedding</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Bracelets</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Necklaces</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Unique</a>
                        </li>
                        <li>
                          <a href="blog-grid-left.html">Glossary</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                <div className="posts-list grid">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/1.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Bridial Fair Collections 2023
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">July 24, 2023</span>
                            <span className="post-comment">1 Comment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/2.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Our Sterling Silver
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">August 16, 2023</span>
                            <span className="post-comment">4 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/3.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              New Season Modern Gold Earrings
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">October 04, 2023</span>
                            <span className="post-comment">3 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/4.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Glossary of Jewelry Terms
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">October 20, 2023</span>
                            <span className="post-comment">1 Comment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/5.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Unique First Anniversary Gift Ideas
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">December 11, 2023</span>
                            <span className="post-comment">5 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/6.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Hypoallergenic Wedding Bands
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">February 07, 2023</span>
                            <span className="post-comment">2 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/7.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Guide to Engagement Ring Styles
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">July 24, 2023</span>
                            <span className="post-comment">3 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/3.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Ultimate Guide To Women's Wedding Bands
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">July 24, 2023</span>
                            <span className="post-comment">1 Comment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                      <div className="post-entry clearfix post-wapper">
                        <div className="post-image">
                          <a href="blog-details-right.html">
                            <img src="/media/blog/1.jpg" alt="" />
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-categories">
                            <a href="blog-grid-right.html">
                              Wedding &amp; Bridal
                            </a>
                          </div>
                          <h2 className="post-title">
                            <a href="blog-details-right.html">
                              Wedding Planning Advice
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-time">July 24, 2023</span>
                            <span className="post-comment">5 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="pagination">
                  <ul className="page-numbers">
                    <li>
                      <a className="prev page-numbers" href="#">
                        Previous
                      </a>
                    </li>
                    <li>
                      <span
                        aria-current="page"
                        className="page-numbers current"
                      >
                        1
                      </span>
                    </li>
                    <li>
                      <a className="page-numbers" href="#">
                        2
                      </a>
                    </li>
                    <li>
                      <a className="page-numbers" href="#">
                        3
                      </a>
                    </li>
                    <li>
                      <a className="next page-numbers" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* #content */}
    </div>
    {/* #primary */}
  </div>
  {/* #main-content */}
</div>

        </>
    )
}